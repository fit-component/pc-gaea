export interface PropsInterface {
    /**
     * 信息 .childs .component .props ...
     */
    info?: any

    /**
     * 默认是否展开全部
     */
    defaultExpendAll?: boolean

    /**
     * 父级实例
     */
    parent?: any

    /**
     * 相对父级的位置
     */
    position?: number
}

export class Props implements PropsInterface {

}

export interface StateInterface {
    /**
     * 单独存储 childs name icon
     * 除非发生变动,否则不渲染
     */
    childs?: any
    name?: string
    icon?: string

    /**
     * 子元素的 key 列表,用来唯一确定每个元素的位置,控制器正确刷新
     */
    childKeys?: Array<string>

    /**
     * 是否选中
     */
    selected?: boolean
}

export class State implements StateInterface {
    selected = false
}