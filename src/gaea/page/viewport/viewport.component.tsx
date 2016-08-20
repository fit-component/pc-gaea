import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './viewport.type'
import {observer, inject} from 'mobx-react'

import {ObservableMap} from 'mobx'
import * as _ from 'lodash'
import './viewport.scss'

import {autoBindMethod} from '../../../../../../common/auto-bind/src'

import EditHelper from './edit-helper/edit-helper.component'
import OuterMoveBox from './outer-move-box/outer-move-box.component'
import EditBox from './edit-box/edit-box.component'

@inject('application', 'viewport') @observer
export default class Viewport extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentDidMount() {
        this.addListener()
    }

    componentWillUnmount() {
        this.props.application.event.off(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver)
        this.props.application.event.off(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave)
        this.props.application.event.off(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus)
    }

    @autoBindMethod addListener() {
        this.props.application.event.on(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver)
        this.props.application.event.on(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave)
        this.props.application.event.on(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus)
    }

    /**
     * 当视图或者树区域有组件 hover
     */
    @autoBindMethod handleViewportOrTreeComponentMouseOver(listnerContext: any, opts: FitGaea.MouseHoverComponentEvent) {
        const targetInstance = this.findEditHelperByMapUniqueId(opts.mapUniqueId)
        targetInstance.outerMoveBoxToSelf()
    }

    /**
     * 根据 mapUniqueKey 找到对应子元素
     */
    @autoBindMethod findEditHelperByMapUniqueId(mapUniqueId: string) {
        const finderPath = this.props.viewport.findComponentPathFromRoot(mapUniqueId)
        let targetInstance = (this.refs[`edit-${this.props.viewport.rootMapUniqueId}`] as any)['wrappedInstance'] as EditHelper
        finderPath.forEach(path=> {
            targetInstance = (targetInstance.refs[`edit-${path}`]as any)['wrappedInstance'] as EditHelper
        })
        return targetInstance
    }

    /**
     * 当视图或者树区域有组件取消 hover
     */
    @autoBindMethod handleViewportOrTreeRootComponentMouseLeave() {
        // 隐藏树视图高亮框
        this.props.viewport.setLeaveHover()
    }

    /**
     * 更改某个子组件的选中状态
     */
    @autoBindMethod handleChangeComponentSelectStatus(listnerContext: any, opts: FitGaea.ComponentSelectStatusEvent) {
        const targetInstance = this.findEditHelperByMapUniqueId(opts.mapUniqueId)
        targetInstance.setSelect(opts.selected)
    }

    @autoBindMethod getRootRef(ref: React.ReactInstance) {
        this.props.viewport.setViewportDomInstance(ReactDOM.findDOMNode(ref))
    }

    render() {
        const style = {
            display: this.props.application.isPreview && 'none'
        }

        return (
            <div className="_namespace"
                 style={style}
                 ref={this.getRootRef}>
                <EditHelper mapUniqueId={this.props.viewport.rootMapUniqueId}
                            ref={`edit-${this.props.viewport.rootMapUniqueId}`}/>
                <OuterMoveBox />
                <EditBox />
            </div>
        )
    }
}