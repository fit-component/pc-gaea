import * as React from 'react'
import {DragSource} from 'react-dnd'
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
    isDragging: monitor.isDragging()
}))
export default class DragSourceComponent extends React.Component <any, any> {
    render() {
        return this.props['connectDragSource'](
            <div className="_namespace drag-box">{this.props.children}</div>
        )
    }
}
