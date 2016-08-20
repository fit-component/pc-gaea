declare namespace FitGaea {
    /**
     * 在视图中的组件属性
     */
    export interface ViewportComponentInfo {
        /**
         * props
         */
        props: ComponentProps
        /**
         * 子元素（gaea-layout才有）
         * 只存子元素在 map 中的 key
         */
        layoutChilds?: Array<string>
        /**
         * 父级 mapUniqueId, 这样不但方便寻找父级,还能根据是否为 null 判断是否为根元素
         */
        parentMapUniqueId: string
    }

    /**
     * 当前正在移动元素的信息
     */
    export interface MovingComponent {
        // 在编辑区域的组件信息
        mapUniqueKey: string
        // 是否是新拖拽的
        isNew: boolean
        // 组件的唯一标识, 新建的时候采用
        uniqueKey: string
    }

    /**
     * hover 元素的信息
     */
    export interface HoverComponentSpec {
        left: number
        top: number
        width: number
        height: number
        hovering: boolean
    }

    /**
     * 一个独立组件的完整信息
     */
    export interface ViewportComponentFullInfo {
        // 组件的 mapUniqueKey
        mapUniqueKey: string
        // 组件信息
        componentInfo: ViewportComponentInfo
        // 子元素列表 （包括非直接子集）
        childs: {
            [mapUniqueKey: string]: ViewportComponentInfo
        }
    }
}