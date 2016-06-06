/**
 * 为组件添加编辑监听功能
 * 为布局组件添加 drag-target
 * assign 传递 props 的 options
 */

import * as React from 'react'
import DragTarget from './drag-target'
import DragSource from './drag-source'
import connect from '../../utils/connect'
import * as actions from '../../stores/actions'
import * as module from './module'
import * as _ from 'lodash'
import layoutStyleParser from './layout-style-parser'

@connect(
    (state: any) => {
        return {
            components: state.components.toJS()
        }
    },
    actions
)
export default class Helper extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    componentWillMount() {
        let childKeys: Array<string> = []
        let childLength = 0
        if (_.isArray(this.props.componentInfo.childs)) {
            childLength = this.props.componentInfo.childs.length
        }
        for (let i = 0; i < childLength; i++) {
            childKeys.push(_.uniqueId('helper_'))
        }

        // 初始化state
        this.setState({
            props: this.props.componentInfo.props || {},
            childs: this.props.componentInfo.childs,
            childKeys
        })
    }

    shouldComponentUpdate(nextProps: module.PropsInterface, nextState: module.StateInterface) {
        // 只有 state 更新才会触发 render, props 更新不需要理会
        if (this.state === nextState) {
            return false
        }
        return true
    }

    /**
     * 获取 mergedProps
     */
    getMergedProps() {
        // 获取组件class
        const componentElement = this.props.components[this.props.componentInfo.component]

        const mergedProps: any = _.cloneDeep(componentElement.defaultProps)
        if ('name' in this.state.props) {
            mergedProps.name = this.state.props.name
        }
        if ('options' in this.state.props) {
            const newOptions = this.state.props.options || {}
            Object.keys(newOptions).map(key=> {
                Object.keys(newOptions[key]).map(detailKey=> {
                    // 小心 false 和 -1 属性被吞了
                    if (newOptions[key][detailKey] !== undefined) {
                        mergedProps.options[key][detailKey] = newOptions[key][detailKey]
                    }
                })
            })
        }
        return mergedProps
    }

    /**
     * 【编辑状态】当 layout 组件被拖入组件【此时当前肯定是 layout 组件】
     */
    handleDrop(componentInfo: any) {
        if (componentInfo.isNew) {
            /**
             * 新增组件
             */
            let newChilds = this.state.childs || []
            const newChild = {
                component: componentInfo.component
            }
            newChilds.push(newChild)

            let newChildKeys = this.state.childKeys
            // 往后再随机分配一个 key
            newChildKeys.push(_.uniqueId('helper_'))

            this.setState({
                childs: newChilds,
                childKeys: newChildKeys
            }, ()=> {
                // 新增完后同步到 rootProps
                this.props.rootPropsUpdatePageInfo(this.props.position, 'childs', {
                    type: 'add',
                    child: newChild
                })
            })
        } else {
            // 已有组件改变父级
            console.log(componentInfo)
        }
    }

    /**
     * 【编辑状态】会被编辑器调用的方法,更新props
     */
    doUpdatePropsOptions(key: string, value: any) {
        let newProps = this.state.props || {}
        if (!newProps.options) {
            newProps.options = {}
        }

        if (newProps.options[key]) {
            newProps.options[key].value = value
        } else {
            newProps.options[key] = {
                value: value
            }
        }

        this.setState({
            props: newProps
        }, ()=> {
            // 修改完后同步到 rootProps
            this.props.rootPropsUpdatePageInfo(this.props.position, 'props', newProps)
        })
    }

    /**
     * 【编辑状态】会被编辑器调用的方法,更新name
     */
    doUpdatePropsName(value: string) {
        let newProps = this.state.props || {}
        newProps.name = value

        this.setState({
            props: newProps
        }, ()=> {
            // 修改完后同步到 rootProps
            this.props.rootPropsUpdatePageInfo(this.props.position, 'name', value)
        })
    }

    /**
     * 【编辑状态】会被编辑器调用的方法,移除自身
     */
    doRemoveSelf() {
        // 如果没有父级,说明是顶层元素,顶层元素无法被删除
        if (this.props.parent === null)return

        this.props.parent.removeChildIndex(this.props.position[this.props.position.length - 1])
    }

    /**
     * 【编辑状态】移除自身第 index 个子元素
     */
    removeChildIndex(index: number) {
        // 删除第 index 个元素
        let newChilds = this.state.childs
        _.pullAt(newChilds, index)

        // childKeys 也删除第 index 个元素
        let newChildKeys = this.state.childKeys
        _.pullAt(newChildKeys, index)

        this.setState({
            childs: newChilds,
            childKeys: newChildKeys
        }, ()=> {
            // 修改完后同步到 rootProps
            this.props.rootPropsUpdatePageInfo(this.props.position, 'childs', {
                type: 'remove',
                index: index
            })
            // 调用关闭编辑窗并清空
            this.props.editBoxDeleteClose()
        })
    }

    /**
     * 【编辑状态】会被编辑器调用的方法,重置 options
     */
    resetOptions(value: string) {
        let newProps = this.state.props || {}
        delete(newProps.options)
        delete(newProps.name)

        this.setState({
            props: newProps
        }, ()=> {
            // 修改完后同步到 rootProps
            this.props.rootPropsUpdatePageInfo(this.props.position, 'reset', null)
            // 同时更新 editBox
            const mergedProps = this.getMergedProps()
            this.props.editBoxUpdate(mergedProps)
        })
    }

    render() {
        // 获取组件class
        const componentElement = this.props.components[this.props.componentInfo.component]
        console.log('helperRender:', this.props.componentInfo.component, this.props.position)

        // 将传入的参数与组件 defaultProps 做 merge,再传给组件
        const mergedProps: any = this.getMergedProps()

        /**
         * 如果组件是gaea-layout,添加子元素
         */
        let children: React.ReactElement<any> = null
        if (this.props.componentInfo.component === 'gaea-layout' && _.isArray(this.state.childs)) {
            children = this.state.childs.map((itemComponentInfo: any, index: number)=> {
                /**
                 * 计算这个children的新position
                 */
                // 基于当前的 position
                const position: Array<number|string> = _.cloneDeep(this.props.position)
                position.push('childs')
                position.push(index)

                /**
                 * 为什么 key 要从 state.childkeys 里取
                 * 1 2 3 4 5 删除了 1,如果 key 变成了 1 2 3 4,那么等于删除了 5
                 * 这是不符合预期的,必须变成 2 3 4 5 才行
                 */
                return <Helper key={this.state.childKeys[index]}
                               position={position}
                               componentInfo={itemComponentInfo}
                               components={this.props['components']}
                               isInEdit={this.props.isInEdit}
                               rootPropsUpdatePageInfo={this.props.rootPropsUpdatePageInfo}
                               outMoveBoxMove={this.props.outMoveBoxMove}
                               editBoxShow={this.props.editBoxShow}
                               editBoxDeleteClose={this.props.editBoxDeleteClose}
                               editBoxUpdate={this.props.editBoxUpdate}
                               parent={this}/>
            })
        }

        /**
         * 这里本来要给组件实例直接传 mergedProps,但是如果组件是 layout,可能部分属性会做调整以便于显示,所以有个判断分支
         */
        let resultElement: React.ReactElement<any>
        let layoutDragTargetStyle: any, layoutDragSourceStyle: any
        if (this.props.componentInfo.component === 'gaea-layout') {
            const styleParser = layoutStyleParser(_.cloneDeep(mergedProps))
            layoutDragTargetStyle = styleParser.layoutDragTargetStyle
            layoutDragSourceStyle = styleParser.layoutDragSourceStyle
            resultElement = React.createElement(componentElement, styleParser.layoutMergedProps, children)
        } else {
            resultElement = React.createElement(componentElement, mergedProps, children)
        }

        /**
         * 编辑状态
         * 添加拖拽目标（只有layout是拖拽目标）
         */
        if (this.props.isInEdit && this.props.componentInfo.component === 'gaea-layout') {
            resultElement = (
                <DragTarget onDrop={this.handleDrop.bind(this)}
                            mergedProps={mergedProps}
                            layoutDragTargetStyle={layoutDragTargetStyle}>
                    {resultElement}
                </DragTarget>
            )
        }

        /**
         * 编辑状态
         * 添加拖拽源（所有,包括layout在内,都是拖拽源）
         * 拖拽源响应点击后触发编辑框事件
         */
        if (this.props.isInEdit) {
            resultElement = (
                <DragSource component={this.props.componentInfo.component}
                            props={this.state.props}
                            childs={this.state.childs}
                            mergedProps={mergedProps}
                            editBoxShow={this.props.editBoxShow}
                            layoutDragSourceStyle={layoutDragSourceStyle}
                            outMoveBoxMove={this.props.outMoveBoxMove}
                            parent={this}>
                    {resultElement}
                </DragSource>
            )
        }

        return resultElement
    }
}