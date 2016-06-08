import * as React from 'react'
import DragSource from '../../utils/drag-source'
import * as module from './drag-source-module'
import * as _ from 'lodash'
import * as actions from '../../stores/actions'
import store from '../../utils/configure-store'
import * as $ from 'jquery'
import {getDomTree, scrollToTreeElement, getSelectedTree} from '../../object-store/dom-tree'
import * as ReactDOM from 'react-dom'

const options = {
    canDrag(props: any) {
        // 跟级不能被拖拽
        return props.helper.props.parent !== null
    },

    isDragging(props: any, monitor: any) {
        return true
    },

    beginDrag(props: any, monitor: any, component: any) {
        return {
            // 在 isNew 为 true 的时候,标识添加的组件名用
            component: props.component,
            type: 'changeParent',
            // 在 isNew 为 false 的时候,当前被拖拽的组件的实例
            instance: props.helper
        }
    },

    endDrag(props: any, monitor: any, component: any) {
    }
}

@DragSource('component', options, (connect: any, monitor: any) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class DragSourceComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()
    private $dom: JQuery
    public isMount: boolean

    componentWillMount() {
        this.isMount = true
    }

    componentWillUnmount() {
        this.isMount = false
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
    }

    /**
     * 弹出属性编辑浮层
     */
    select() {
        // 设置为选中
        if (!this.state.isSelected) {
            this.setState({
                isSelected: true
            })

            // 同时触发盒子显示
            store.dispatch(actions.editBoxShow(this.props.helper, this, this.props.mergedProps, this.props.helper.props.parent === null, this.props.helper.getPositions()))
        }
    }

    /**
     * 被点击
     */
    handleClick(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()
        this.select()

        // 设置对应 tree 为选中状态
        const domTree = getDomTree()
        const treeInstance = domTree.getChildByPositions(this.props.helper.getPositionsAsDomTree())
        treeInstance.setSelected(true)
        // 此时通知 domTree 滚动到对应位置
        scrollToTreeElement(treeInstance.$dom)
    }

    // 设置其选中状态
    setSelected(isSelected: boolean) {
        if (!this.isMount)return
        this.setState({
            isSelected: isSelected
        })
    }

    setHover() {
        store.dispatch(actions.outMoveBoxMove({
            left: this.$dom.offset().left,
            top: this.$dom.offset().top,
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

        const currentSelectedDomTreeElement = getSelectedTree()
        if (currentSelectedDomTreeElement === null) {
            // 如果当前没有选中的 domTree 元素,通知 domTree 对应元素触发 setHover
            const domTree = getDomTree()
            const treeInstance = domTree.getChildByPositions(this.props.helper.getPositionsAsDomTree())
            treeInstance.setHover()
            // 此时通知 domTree 滚动到对应位置
            scrollToTreeElement(treeInstance.$dom)
        }
    }

    render() {
        // 只有layout组件要使外部div样式与内部保持一致
        let outerStyle: any = {}
        if (this.props.component === 'gaea-layout') {
            outerStyle = _.cloneDeep(this.props.layoutDragSourceStyle)
        }

        // 被选中后的状态
        if (this.state.isSelected) {
            outerStyle.outline = '2px dotted #23b7e5'
            outerStyle.zIndex = 1
        }

        return this.props.connectDragSource(
            <div style={outerStyle}
                 onMouseOver={this.handleMouseEnter.bind(this)}
                 onClick={this.handleClick.bind(this)}>{this.props.children}</div>
        )
    }
}
