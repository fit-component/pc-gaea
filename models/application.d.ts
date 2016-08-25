declare namespace FitGaea {
    /**
     * 组件信息
     */
    export interface ComponentProps extends __React.HTMLProps<any> {
        /**
         * 唯一的 key,用来唯一标识这个组件,所有盖亚内部组件都以 gaea- 为前缀
         */
        uniqueKey: string
        /**
         * 组件的中文名
         */
        name: string
        /**
         * 组件图标,为 fontAwesome
         */
        icon?: string

        options?: {
            [key: string]: ComponentPropsOptions
        }

        [x: string]: any
    }

    /**
     * 组件配置中数组配置
     */
    export interface ComponentPropsOptionsArray extends ComponentPropsOptions {
        key: string
    }

    /**
     * 组件配置中数组配置的值
     */
    export interface ComponentPropsOptionsArrayValue {
        /**
         * ComponentPropsOptionsArray 设置的 key
         */
        key: string
        /**
         * 用户填入的值
         */
        value: number|string
    }

    /**
     * 组件配置 选择器配置
     */
    export interface ComponentPropsOptionsSelector {
        key: number|string
        value: number|string
    }

    /**
     * 组件的值
     */
    export type ComponentPropsOptionValue = number|string|Array<ComponentPropsOptionsArrayValue>

    /**
     * 组件配置
     */
    export interface ComponentPropsOptions {
        /**
         * 选项名称
         */
        label: string
        /**
         * 选项值
         */
        value?: ComponentPropsOptionValue
        /**
         * 编辑器类型 text array(暂时不支持2层以上) selector
         */
        editor: string
        /**
         * 是否可被编辑
         */
        editable: boolean
        /**
         * 当 editor 为 array 时的数组配置
         * 数组中的 key,和填入的值,会作为 Array<key:value> 填入到 value 中
         */
        array?: Array<ComponentPropsOptionsArrayValue>
        /**
         * 当 editor 为 selector 时的数组配置
         */
        selector?: Array<ComponentPropsOptionsSelector>
    }

    /**
     * 保存信息
     */
    export interface SaveInfo {
        /**
         * 保存时间
         */
        date: Date,
        /**
         * 页面组件构成信息
         */
        pageInfo: any,
        /**
         * 唯一标识
         */
        id: string,
        /**
         * 是否已发布
         */
        isPublished?: boolean,
        /**
         * 发布的版本号
         */
        publishCode?: string
        /**
         * 发布的备注
         */
        remarks?: string
    }

    /**
     * 资源文件
     */
    export interface SourceFile {
        // 文件类型
        type: string
        // 文件名
        name: string
        // 序号,排在第几
        order: number
    }

    /**
     * 上线信息
     */
    export interface OnlineVersion {
        key: string,
        value: string
    }

    /**
     * 组合信息
     */
    export interface ComboComponentInfo extends ViewportComponentFullInfo {
        // 组合名
        name: string
    }
}