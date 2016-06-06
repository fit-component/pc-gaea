export interface EditOption {
    /**
     * 值
     */
    value?: any

    /**
     * 选用什么类型的编辑器
     */
    editor?: string

    /**
     * 表单名
     */
    label?: string

    /**
     * 是否可编辑
     */
    editable?: boolean
}

export interface EditProps {
    /**
     * 组件显示的名字
     */
    name: string

    /**
     * 唯一的key
     */
    uniqueKey?: number|string

    /**
     * 参数
     */
    options?: {
        [x: string]: any
    }
}