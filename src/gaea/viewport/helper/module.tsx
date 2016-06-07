export interface PropsInterface {
    /**
     * 是否在编辑状态
     */
    isInEdit?: boolean

    /**
     * 所有组件
     */
    components?: any

    /**
     * 距离根组件的定位数组
     * 例如 ['pageInfo', 'childs', 0, 'childs', 1]
     */
    position?: number | string

    /**
     * 组件信息
     */
    componentInfo?: {
        /**
         * 当前使用的组件名【这个不会变】
         */
        component?: string

        /**
         * 对组件props的覆盖(自定义组件)
         */
        props?: any

        /**
         * 子元素描述
         */
        childs?: any
    }

    /**
     * editBoxShow action
     */
    editBoxShow?: any

    /**
     * outMoveBoxMove action
     */
    outMoveBoxMove?: (data?: any)=>void

    /**
     * editBoxDeleteClose action
     */
    editBoxDeleteClose?: ()=>void

    /**
     * editBoxUpdate action
     */
    editBoxUpdate?: (mergedProps: any)=>void

    /**
     * 父级对象
     */
    parent?: any
}

export class Props implements PropsInterface {
    isInEdit = false
}

export interface StateInterface {
    /**
     * 对组件props的覆盖(自定义组件)
     * 因为会改变,存在state里一份
     */
    props?: any

    /**
     * 子元素描述
     * 因为会变,存在state里一份
     */
    childs?: any

    /**
     * 子元素的 key 列表,用来唯一确定每个元素的位置,控制器正确刷新
     */
    childKeys?: Array<string>

    /**
     * 如果是layout,那就禁用
     */
    disableIfLayout?: boolean
}

export class State implements StateInterface {
    disableIfLayout = false
}