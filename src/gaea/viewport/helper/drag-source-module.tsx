export interface PropsInterface {
    /**
     * 当前组件名
     */
    component?: string

    /**
     * 当前组件的配置信息
     */
    props?: any

    /**
     * 当前组件子元素
     */
    childs?: any

    /**
     * 与defaultProps聚合之后的完整配置信息
     */
    mergedProps?: any

    /**
     * connectDragSource
     */
    connectDragSource?: any

    /**
     * 被点击
     */
    onClick?: ()=>void
    
    /**
     * layout 的额外样式
     */
    layoutDragSourceStyle?: any
    
    /**
     * 父级helper对象
     */
    helper?: any
}

export class Props implements PropsInterface {

}

export interface StateInterface {
    /**
     * 是否被点击后处于选中状态
     */
    isSelected?: boolean
}

export class State implements StateInterface {
    isSelected = false
}