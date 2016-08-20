import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './components.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from '../../../../../../../../common/auto-bind/src'
import {Button, ButtonGroup} from '../../../../../../../button/src'
import * as Sortable from 'sortablejs'
import DragSource from './drag-source.component'

const switchTypes = [{
    type: 'custom',
    name: '定制'
}, {
    type: 'base',
    name: '基础'
}, {
    type: 'group',
    name: '组合'
}]

@inject('application', 'viewport') @observer
export default class Components extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 拖拽元素对象
    private dragContainerInstance: React.ReactInstance
    // 拖拽元素 dom 对象
    private dragContainerDomInstance: Element

    // 保存上一次拖拽的位置
    private lastDragStartIndex: number

    componentDidMount() {
        /**
         * 子元素可拖拽
         */
        Sortable.create(ReactDOM.findDOMNode(this.dragContainerInstance), {
            animation: 150,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: 'gaea-layout',
                pull: 'clone',
                put: false
            },
            sort: false,
            delay: 0,
            onStart: (event: any) => {
                this.lastDragStartIndex = event.oldIndex as number
                this.props.viewport.startDragging('', this.getUniqueKeyByIndex(event.oldIndex as number), true)
            },
            onEnd: (event: any) => {
                this.props.viewport.endDragging()
                // 因为是 clone 方式, 拖拽成功的话元素会重复, 没成功拖拽会被添加到末尾
                // 所以先移除 clone 的元素（吐槽下, 拖走的才是真的, 留下的才是 clone 的）
                // 有 parentNode, 说明拖拽完毕还是没有被清除, 说明被拖走了, 因为如果没真正拖动成功, clone 元素会被删除
                if (event.clone.parentNode) {
                    // 有 clone, 说明已经真正拖走了
                    this.dragContainerDomInstance.removeChild(event.clone)
                    // 再把真正移过去的弄回来
                    if (this.lastDragStartIndex === this.dragContainerDomInstance.childNodes.length) {
                        // 如果拖拽的是最后一个
                        this.dragContainerDomInstance.appendChild(event.item)
                    } else {
                        // 拖拽的不是最后一个
                        this.dragContainerDomInstance.insertBefore(event.item, this.dragContainerDomInstance.childNodes[this.lastDragStartIndex])
                    }
                } else {
                    // 没拖走, 只是晃了一下, 不用管了
                }

            }
        })
    }

    /**
     * 获得第 n 个子元素的 uniqueKey
     */
    @autoBindMethod getUniqueKeyByIndex(index: number) {
        switch (this.state.selectedType) {
            case 'custom':
                return this.props.application.customComponents[index].defaultProps.uniqueKey
            case 'base':
                return this.props.application.baseComponents[index].defaultProps.uniqueKey
        }
    }

    /**
     * 设置元素对象
     */
    @autoBindMethod setDragContainerInstance(ref: React.ReactInstance) {
        this.dragContainerInstance = ref
        this.dragContainerDomInstance = ReactDOM.findDOMNode(ref)
    }

    /**
     * 选中了一个类型
     */
    @autoBindMethod handleChangeSelectedType(type: string) {
        this.setState({
            selectedType: type
        })
    }

    /**
     * 生成组件类型选择按钮组
     */
    @autoBindMethod renderSwitchButtonGroup() {
        return switchTypes.map((item, index)=> {
            // 可能会隐藏掉定制组件
            if (this.props.application.isHideCustomComponents && item.type === 'base') {
                return null
            }

            return (
                <Button type="secondary"
                        key={index}
                        onClick={this.handleChangeSelectedType.bind(this, item.type)}
                        active={item.type === this.state.selectedType}>
                    {item.name}
                </Button>
            )
        })
    }

    /**
     * 渲染拖拽组件
     */
    @autoBindMethod renderDragComponents() {
        switch (this.state.selectedType) {
            case 'custom':
                return this.props.application.customComponents.map((item, index)=> {
                    return (
                        <DragSource key={index}
                                    uniqueKey={item.defaultProps.uniqueKey}>
                            <i className={`fa fa-${item.defaultProps.icon || 'cube'} icons`}/>
                            {item.defaultProps.name}
                        </DragSource>
                    )
                })
            case 'base':
                return this.props.application.baseComponents.map((item, index)=> {
                    return (
                        <DragSource key={index}
                                    uniqueKey={item.defaultProps.uniqueKey}>
                            <i className={`fa fa-${item.defaultProps.icon || 'cube'} icons gaea`}/>
                            {item.defaultProps.name}
                        </DragSource>
                    )
                })
            case 'group':
                // return this.state.groups.map((item, index)=> {
                //     return (
                //         <DragSource key={index}
                //                     uniqueKey="gaea-layout"
                //                     info={item.info}>
                //             <i className={`fa fa-cubes icons gaea`}/>
                //             {item.name}
                //         </DragSource>
                //     )
                // })
                return null
        }
    }

    render() {
        const SwitchButtonGroup = this.renderSwitchButtonGroup()
        const DragComponents = this.renderDragComponents()

        return (
            <div className="_namespace components-container">
                <div className="container"
                     ref={this.setDragContainerInstance}>
                    {DragComponents}
                </div>
                <div className="switch">
                    <ButtonGroup className="button-group"
                                 vertical>{SwitchButtonGroup}</ButtonGroup>
                </div>
            </div>
        )
    }
}