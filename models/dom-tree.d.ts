declare namespace Models {
    export interface DomTree {
        extraContent?: DomTreeExtraContent
    }

    // 状态树额外显示内容的状态,比如显示当前选中组件的预览
    export interface DomTreeExtraContent {
        type: string
        // 如果是组件预览模式,那么要预览的组件名就是这个
        componentPreviewName?: string
    }

    export type DomTreeExtraContentType = '' | 'componentPreview'
}
