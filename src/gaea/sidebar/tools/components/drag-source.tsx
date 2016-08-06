import * as React from 'react'
import {DragSource} from 'react-dnd'
import * as actions from '../../../stores/actions'
import store from '../../../utils/configure-store'
import './index.scss'

const options = {
    canDrag() {
        return true
    },

    isDragging(props: any, monitor: any) {
        return true
    },

    beginDrag(props: any, monitor: any, component: any) {
        return {
            component: props.uniqueKey,
            type: props.type,
            info: props.info
        }
    },

    endDrag(props: any, monitor: any, component: any) {
    }
}

@DragSource('component', options, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    handleMouseEnter: (uniqueKey: string)=> {
        // 触发在 dom-tree 显示组件预览的 action
        store.dispatch(actions.domTreeExtraContentShow(uniqueKey))
    },
    handleMouseLeave: ()=> {
        // 触发在 dom-tree 关闭额外内容显示
        store.dispatch(actions.domTreeExtraContentHide())
    }
}))
export default class DragSourceComponent extends React.Component <any, any> {
    render() {
        return this.props['connectDragSource'](
            <div className="_namespace drag-box"
                 onMouseEnter={this.props['handleMouseEnter'].bind(this, this.props['uniqueKey'])}
                 onMouseLeave={this.props['handleMouseLeave']}>
                {this.props.children}
            </div>
        )
    }
}
