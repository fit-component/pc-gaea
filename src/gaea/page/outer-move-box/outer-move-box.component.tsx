import * as React from 'react'
import * as typings from './outer-move-box.type'
import {observer, inject} from 'mobx-react'
import './outer-move-box.scss'

import {autoBindMethod} from '../../../../../../common/auto-bind/src'

@inject('viewport', 'application') @observer
export default class OuterMoveBox extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @autoBindMethod handleClick() {
        // 设置选中组件的 uniqueKey
        this.props.viewport.setCurrentEditComponentMapUniqueKey(this.props.viewport.hoveringComponentMapUniqueKey)

        // 把上一个组件触发非选中
        if (this.props.viewport.lastSelectMapUniqueKey !== null) {
            // 如果上个选中组件没被关
            this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
                mapUniqueKey: this.props.viewport.lastSelectMapUniqueKey,
                selected: false
            } as FitGaea.ComponentSelectStatusEvent)
        }

        // 设置自己为上一个组件
        this.props.viewport.setLastSelectMapUniqueKey(this.props.viewport.hoveringComponentMapUniqueKey)

        // 触发选中组件 event, 各 layout 会接收, 设置子组件的 setSelect
        this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
            mapUniqueKey: this.props.viewport.hoveringComponentMapUniqueKey,
            selected: true
        } as FitGaea.ComponentSelectStatusEvent)
    }

    render() {
        // 如果正在拖拽, 或者没有 hover, 则不显示
        if (this.props.viewport.isMovingComponent || !this.props.viewport.viewportHoverComponentSpec.hovering) {
            return null
        }

        const style = {
            left: this.props.viewport.viewportHoverComponentSpec.left,
            top: this.props.viewport.viewportHoverComponentSpec.top,
            width: this.props.viewport.viewportHoverComponentSpec.width,
            height: this.props.viewport.viewportHoverComponentSpec.height
        }

        return (
            <div className="_namespace"
                 onClick={this.handleClick}
                 style={style}/>
        )
    }
}