import * as React from 'react'

export interface PropsInterface {
    /**
     * 外部提供编辑组件
     */
    components?: Array<React.Component<any ,any>>

    /**
     * 页面初始化信息
     */
    pageInfo?: any

    /**
     * 点击保存后会返回页面结构树信息
     */
    onSave?: (info?: any)=>void

    /**
     * 工具栏:是否只显示定制组件
     */
    toolsOnlyCustomComponents?: boolean

    [x: string]: any
}

export class Props implements PropsInterface {
    components = new Array()
    toolsOnlyCustomComponents = false
    onSave = ()=> {
    }
}

export interface StateInterface {
    /**
     * 是否在预览模式
     */
    isPreview?: boolean
}

export class State implements StateInterface {
    isPreview = false
}