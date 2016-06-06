export interface PropsInterface {
    /**
     * 传过来的聚合配置
     */
    mergedProps?: any

    /**
     * 是否可以被拖进来
     */
    canDrop?: boolean

    /**
     * 是否拖拽元素『只』hover了它
     */
    isOver?: boolean

    /**
     * 被拖进来时触发
     */
    onDrop?: (options?: any)=>void

    /**
     * connectDropTarget对象
     */
    connectDropTarget?: any

    /**
     * layout 的额外样式
     */
    layoutDragTargetStyle?: any
}

export class Props implements PropsInterface {
    canDrop = false
    isOver = false
}

export interface StateInterface {

}

export class State implements StateInterface {

}