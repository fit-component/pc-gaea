/**
 * 编辑辅助组件
 * 每个子组件的在 map 中的 key 都由父级生成
 * 父级先在 store 中创建爱你数据, 再直接把 mapUniqueId 扔给子元素,数据获取绑定全部交给子元素自己
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './edit-helper.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from '../../../../../../../common/auto-bind/src'
import fitLayoutStyle from '../../../../utils/fit-layout-style'

import * as _ from 'lodash'
import * as Sortable from 'sortablejs'
import * as classNames from 'classnames'

import './edit-helper.scss'

@inject('application', 'viewport') @observer
export default class EditHelper extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 装饰器给外部用挺方便,这个专门给自己用 ^_^
    static ObserveEditHelper = inject('application', 'viewport')(observer(EditHelper))

    // 自身真实组件的 class
    private SelfComponent: React.ComponentClass<FitGaea.ComponentProps>

    // 对应 store 中的数据
    private componentInfo: FitGaea.ViewportComponentInfo

    // 元素对象
    private childInstance: React.ReactInstance
    // 元素dom对象
    private childDomInstance: Element

    // sortable 对象, 只有布局组件才有
    private sortable: any

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.viewport.components.get(this.props.mapUniqueId)

        // 获取当前要渲染的组件 class
        this.SelfComponent = this.props.application.getComponentByUniqueKey(this.componentInfo.props.uniqueKey)
    }

    componentDidMount() {
        this.childDomInstance = ReactDOM.findDOMNode(this.childInstance)

        // 由于外面包了一层 div,找到其子元素
        const childComponentDomInstance = this.childDomInstance.childNodes[0] as Element

        // 如果自己是布局元素, 给子元素绑定 sortable
        if (this.componentInfo.props.uniqueKey === 'gaea-layout') {
            // 添加可排序拖拽
            this.sortable = Sortable.create(childComponentDomInstance, {
                animation: 150,
                // 放在一个组里,可以跨组拖拽
                group: {
                    name: 'gaea-layout',
                    pull: true,
                    put: true
                },
                onStart: (event: any) => {
                    this.props.viewport.startDragging(this.componentInfo.layoutChilds[event.oldIndex as number], '', false, childComponentDomInstance, event.oldIndex as number)
                },
                onEnd: (event: any) => {
                    this.props.viewport.endDragging()

                    // 在 viewport 中元素拖拽完毕后, 为了防止 outer-move-box 在原来位置留下残影, 先隐藏掉
                    this.props.viewport.setLeaveHover()
                    this.props.viewport.setTreeLeaveHover()
                },
                onAdd: (event: any)=> {
                    // 增加一个元素
                    const mapUniqueKey = this.props.viewport.addComponent(this.props.mapUniqueId, event.newIndex as number)

                    // 取消 srotable 对 dom 的修改
                    // 删掉 dom 元素, 让 react 去生成 dom
                    if (this.props.viewport.currentMovingComponent.isNew) {
                        // 是新拖进来的, 不用管, 因为工具栏会把它收回去
                        // 为什么不删掉? 因为这个元素不论是不是 clone, 都被移过来了, 不还回去 react 在更新 dom 时会无法找到
                        // 记录新增历史
                        this.props.viewport.saveOperate({
                            type: 'add',
                            mapUniqueKey,
                            add: {
                                uniqueId: this.props.viewport.currentMovingComponent.uniqueKey,
                                parentMapUniqueKey: this.props.mapUniqueId,
                                index: event.newIndex as number
                            }
                        })
                    } else {
                        // 如果是从某个元素移过来的（新增的,而不是同一个父级改变排序）
                        // 把这个元素还给之前拖拽的父级
                        if (this.props.viewport.dragStartParentElement.childNodes.length === 0) {
                            // 之前只有一个元素
                            this.props.viewport.dragStartParentElement.appendChild(event.item)
                        } else if (this.props.viewport.dragStartParentElement.childNodes.length === this.props.viewport.dragStartIndex) {
                            // 是上一次位置是最后一个, 而且父元素有多个元素
                            this.props.viewport.dragStartParentElement.appendChild(event.item)
                        } else {
                            // 不是最后一个, 而且有多个元素
                            // 插入到它下一个元素的前一个
                            this.props.viewport.dragStartParentElement.insertBefore(event.item, this.props.viewport.dragStartParentElement.childNodes[this.props.viewport.dragStartIndex])
                        }

                        // 设置新增时拖拽源信息
                        this.props.viewport.setDragTarget(this.props.mapUniqueId, event.newIndex as number)
                    }
                },
                onUpdate: (event: any)=> {
                    // 同一个父级下子元素交换父级
                    // 取消 srotable 对 dom 的修改, 让元素回到最初的位置即可复原
                    const oldIndex = event.oldIndex as number
                    const newIndex = event.newIndex as number
                    if (this.props.viewport.dragStartParentElement.childNodes.length === oldIndex + 1) {
                        // 是从最后一个元素开始拖拽的
                        this.props.viewport.dragStartParentElement.appendChild(event.item)
                    } else {
                        if (newIndex > oldIndex) {
                            // 如果移到了后面
                            this.props.viewport.dragStartParentElement.insertBefore(event.item, this.props.viewport.dragStartParentElement.childNodes[oldIndex])
                        } else {
                            // 如果移到了前面
                            this.props.viewport.dragStartParentElement.insertBefore(event.item, this.props.viewport.dragStartParentElement.childNodes[oldIndex + 1])
                        }
                    }
                    this.props.viewport.sortComponents(this.props.mapUniqueId, event.oldIndex as number, event.newIndex as number)

                    this.props.viewport.saveOperate({
                        type: 'exchange',
                        mapUniqueKey: this.props.mapUniqueId,
                        exchange: {
                            oldIndex,
                            newIndex
                        }
                    })
                },
                onRemove: (event: any)=> {
                    // 减少了一个子元素
                    this.componentInfo.layoutChilds.splice(event.oldIndex as number, 1)

                    // 新增历史纪录
                    this.props.viewport.saveOperate({
                        type: 'move',
                        // 新增元素父级 key
                        mapUniqueKey: this.props.mapUniqueId,
                        move: {
                            targetParentMapUniqueKey: this.props.viewport.dragTargetMapUniqueKey,
                            targetIndex: this.props.viewport.dragTargetIndex,
                            sourceParentMapUniqueKey: this.props.mapUniqueId,
                            sourceIndex: event.oldIndex as number
                        }
                    })

                    this.props.viewport.setDragTarget(null, -1)
                }
            })
        }
    }

    componentWillUnmount() {
        // 如果是布局组件, 就销毁 sortable
        if (this.componentInfo.props.uniqueKey === 'gaea-layout') {
            // TODO 这里会报错
            // this.sortable.destory()
        }
    }

    /**
     * 鼠标移上去
     */
    @autoBindMethod handleMouseOver(event: React.MouseEvent) {
        event.stopPropagation()
        this.props.application.event.emit(this.props.application.event.viewportOrTreeComponentMouseOver, {
            mapUniqueId: this.props.mapUniqueId,
            type: 'component'
        } as FitGaea.MouseHoverComponentEvent)
        this.props.viewport.setHoveringComponentMapUniqueKey(this.props.mapUniqueId)
    }

    /**
     * 最外层 鼠标移开
     */
    @autoBindMethod handleMouseLeave(event: React.MouseEvent) {
        event.stopPropagation()

        if (this.componentInfo.parentMapUniqueId !== null) {
            // 根元素才响应此事件
            return
        }

        this.props.application.event.emit(this.props.application.event.viewportOrTreeRootComponentMouseLeave, {
            mapUniqueId: this.props.mapUniqueId,
            type: 'component'
        } as FitGaea.MouseHoverComponentEvent)
        this.props.viewport.setHoveringComponentMapUniqueKey(null)
    }

    /**
     * 让树视图高亮框移动到自己身上
     */
    @autoBindMethod outerMoveBoxToSelf() {
        this.props.viewport.setHoverComponent(this.childDomInstance)
    }

    @autoBindMethod handleClick(event: React.MouseEvent) {
        event.stopPropagation()

        // 设置选中组件的 uniqueKey
        this.props.viewport.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueId)

        // 把上一个组件触发非选中
        if (this.props.viewport.lastSelectMapUniqueId !== null) {
            // 如果上个选中组件没被关
            this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
                mapUniqueId: this.props.viewport.lastSelectMapUniqueId,
                selected: false
            } as FitGaea.ComponentSelectStatusEvent)
        }

        // 设置自己为上一个组件
        this.props.viewport.setLastSelectMapUniqueId(this.props.mapUniqueId)

        // 触发选中组件 event, 各 layout 会接收, 设置子组件的 setSelect
        this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
            mapUniqueId: this.props.mapUniqueId,
            selected: true
        } as FitGaea.ComponentSelectStatusEvent)
    }

    /**
     * 修改自己选中状态
     */
    @autoBindMethod setSelect(selected: boolean) {
        this.setState({
            selected
        })
    }

    render() {
        // 子元素
        let childs: Array<React.ReactElement<any>> = null

        // gaea-layout 可以有子元素
        if (this.componentInfo.props.uniqueKey === 'gaea-layout' && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey=> {
                return (
                    <EditHelper.ObserveEditHelper key={layoutChildUniqueMapKey}
                                                  mapUniqueId={layoutChildUniqueMapKey}
                                                  ref={`edit-${layoutChildUniqueMapKey}`}/>
                )
            })
        }

        let componentProps = _.cloneDeep(this.componentInfo.props)
        let outerStyle = {}

        if (this.componentInfo.props.uniqueKey === 'gaea-layout') {
            outerStyle = fitLayoutStyle(componentProps.options)
        }

        const classes = classNames({
            '_namespace': true,
            'selected': this.state.selected
        })

        return (
            <div className={classes}
                 ref={(ref: React.ReactInstance)=> {
                    this.childInstance = ref
                 }}
                 style={outerStyle}
                 onClick={this.handleClick}
                 onMouseOver={this.handleMouseOver}
                 onMouseLeave={this.handleMouseLeave}>
                {React.createElement(this.SelfComponent, componentProps, childs)}
            </div>
        )
    }
}