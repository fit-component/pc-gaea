import * as React from 'react'
import DropTarget from '../../utils/drop-target'
import * as module from './drag-target-module'
import * as _ from 'lodash'

const options = {
    canDrop(props: any, monitor: any) {
        return true
    },

    drop(props: any, monitor: any, component: any) {
        /**
         * 如果子元素被drop了,那这个元素不响应drop事件
         */
        const hasDroppedOnChild = monitor.didDrop()
        if (hasDroppedOnChild) {
            return
        }

        props['onDrop'](monitor.getItem())
    }
}

@DropTarget('component', options, (connect: any, monitor: any) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop()
}))
export default class DragTargetComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        /**
         * 只有 layout 组件有
         * 这样一来,就清楚内部样式的预设了
         */
        // 编辑状态要使外部div样式与内部保持一致
        let outerStyle: any = _.cloneDeep(this.props.layoutDragTargetStyle)
        if (this.props.isOver) {
            outerStyle.outline = '2px dotted #bbb'
            outerStyle.zIndex = 1
        }

        return this.props.connectDropTarget(
            <div style={outerStyle}>{this.props.children}</div>
        )
    }
}