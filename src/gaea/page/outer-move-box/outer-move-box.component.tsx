import * as React from 'react'
import * as typings from './outer-move-box.type'
import {observer, inject} from 'mobx-react'
import './outer-move-box.scss'

import {autoBindMethod} from '../../../../../../common/auto-bind/src'

@inject('viewport', 'application') @observer
export default class OuterMoveBox extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

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
                 style={style}/>
        )
    }
}