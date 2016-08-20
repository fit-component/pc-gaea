declare namespace FitGaea {
    /**
     * 鼠标移动到组件上/树对应的组件上
     */
    export interface MouseHoverComponentEvent {
        mapUniqueId: string
        type: string
    }

    /**
     * 修改某个组件选中状态
     */
    export interface ComponentSelectStatusEvent {
        mapUniqueId: string
        selected: boolean
    }
}