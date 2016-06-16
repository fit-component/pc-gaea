import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as module from './module'
import {TreeNode} from '../../../../../../tree/src'
import {getComponents} from '../../../object-store/components'
import {getDomTreePosition, setSelectedTreeAndUnselectBefore, clearSelectedTree} from '../../../object-store/dom-tree'
import {getViewPort} from "../../../object-store/view-port"
import store from '../../../utils/configure-store'
import * as className from 'classnames'
import * as $ from 'jquery'
import {get$domTree} from '../../../object-store/dom-tree'
import * as actions from '../../../stores/actions'
import * as _ from 'lodash'
import './index.scss'

export default class TreeElement extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()
    private $dom: JQuery

    shouldComponentUpdate(nextProps: module.PropsInterface, nextState: module.StateInterface) {
        return this.state !== nextState
    }

    componentWillMount() {
        const components = getComponents()
        let name: string = components[this.props.info.component].defaultProps.name
        let icon: string = components[this.props.info.component].defaultProps.icon || 'cube'
        if (this.props.info.props && this.props.info.props && this.props.info.props.name) {
            name = this.props.info.props.name
        }

        // 设置childKeys
        let childKeys: Array<string> = []
        let childLength = 0
        if (_.isArray(this.props.info.childs)) {
            childLength = this.props.info.childs.length
        }
        for (let i = 0; i < childLength; i++) {
            childKeys.push(_.uniqueId('tree_'))
        }

        this.setState({
            name,
            icon,
            childs: this.props.info.childs,
            childKeys
        })
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
    }

    /**
     * 获得positions路径
     */
    getPositions() {
        let positionsArray: Array<number> = []
        let instance = this
        // 没有循环到顶层 pageInfo 时不要停
        while (instance.props.parent !== null) {
            positionsArray.unshift(instance.props.position)
            instance = instance.props.parent
        }
        return positionsArray
    }

    /**
     * 新增一个子元素
     */
    addNewChild(component: string) {
        let newChilds = this.state.childs || []
        const newChild = {
            component: component
        }

        newChilds.push(newChild)

        let newChildKeys = this.state.childKeys
        // 往后再随机分配一个 key
        newChildKeys.push(_.uniqueId('tree_'))

        this.setState({
            childs: newChilds,
            childKeys: newChildKeys
        })
    }

    /**
     * 新增一个已存在的元素
     */
    addExistChild(info: any) {
        let newChilds = this.state.childs || []
        const newChild = _.cloneDeep(info)

        newChilds.push(newChild)

        let newChildKeys = this.state.childKeys
        // 往后再随机分配一个 key
        newChildKeys.push(_.uniqueId('tree_'))

        this.setState({
            childs: newChilds,
            childKeys: newChildKeys
        })
    }

    /**
     * 渲染名称
     */
    nameRender() {
        // 如果 uniqueKey 中有 gaea,说明是内置组件,用背景加深方式展现
        if (this.props.info.component.indexOf('gaea') > -1) {
            return (
                <div className="flex">
                    <i className={`fa fa-${this.state.icon} icons gaea`}/>
                    <span className="text">{this.state.name}</span>
                </div>
            )
        } else {
            return (
                <div className="flex">
                    <i className={`fa fa-${this.state.icon} icons`}/>
                    <span className="text">{this.state.name}</span>
                </div>
            )
        }
    }

    /**
     * 重新设置名称
     */
    setName(name: string) {
        this.setState({
            name: name
        })
    }

    /**
     * 设置为选中状态
     */
    setSelected(selected: boolean) {
        this.setState({
            selected: selected
        })
        if (selected) {
            setSelectedTreeAndUnselectBefore(this)
        }
    }

    /**
     * 设置为 hover 状态
     */
    setHover() {
        const domTreePosition = getDomTreePosition()
        // 获取 $domTree 的滚动值
        const $domTree = get$domTree()

        if (!domTreePosition){
            return
        }

        store.dispatch(actions.treeMoveBoxMove({
            left: this.$dom.offset().left - domTreePosition.left,
            top: this.$dom.offset().top - domTreePosition.top + $domTree.scrollTop() - 2,
            width: this.$dom.outerWidth(),
            height: this.$dom.outerHeight()
        }))
    }

    /**
     * 鼠标飘进
     */
    handleMouseEnter(event: Event) {
        event.stopPropagation()
        this.setHover()
        // 获得对应 helper 对象
        const viewPort = getViewPort()
        const helperInstance = viewPort.getChildByPositions(this.getPositions())
        helperInstance.refs['dragSource'].decoratedComponentInstance.setHover()
    }

    /**
     * 鼠标点击
     */
    handleClick(event: Event) {
        event.preventDefault()
        event.stopPropagation()
        this.setSelected(true)
        // 通知 helper 选中
        const viewPort = getViewPort()
        const helperInstance = viewPort.getChildByPositions(this.getPositions())
        helperInstance.refs['dragSource'].decoratedComponentInstance.select()
    }

    /**
     * 移除自己的第index个元素
     */
    removeChildIndex(index: number) {
        let newChilds = this.state.childs
        _.pullAt(newChilds, index)

        let newChildKeys = this.state.childKeys
        _.pullAt(newChildKeys, index)

        // 通知 object-store 清空元素
        clearSelectedTree()

        this.setState({
            childs: newChilds,
            childKeys: newChildKeys
        })
    }

    render() {
        let children: React.ReactElement<any> = null
        let classes = className({
            '_namespace': true,
            selected: this.state.selected
        })

        let childElements: React.ReactElement<any> = null
        if (this.state.childs) {
            childElements = this.state.childs.map((item: any, index: number)=> {
                let props = {
                    key: this.state.childKeys[index],
                    info: item,
                    defaultExpendAll: this.props.defaultExpendAll,
                    parent: this,
                    position: index,
                    ref: index
                }
                return React.createElement(TreeElement, props)
            })
        }

        children = React.createElement(TreeNode, {
            className: classes,
            render: this.nameRender.bind(this),
            defaultExpendAll: this.props.defaultExpendAll,
            onMouseOver: this.handleMouseEnter.bind(this),
            onClick: this.handleClick.bind(this),
            toggleByArrow: true
        }, childElements)

        return children
    }
}