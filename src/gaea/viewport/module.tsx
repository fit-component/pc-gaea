import * as React from 'react'

export interface PropsInterface {
}

export class Props implements PropsInterface {

}

export interface StateInterface {
    /**
     * 页面整体配置信息
     */
    pageInfo?: any

    /**
     * 页面缩放大小
     */
    paddingSize?: number

    /**
     * 是否是预览状态
     */
    isPreview?: boolean

    /**
     * 给整体的 key,改变它可以强制重新渲染全部子元素,因为所有子元素都是自治的
     */
    renderKey?: number
}

export class State implements StateInterface {
    paddingSize = 0
    isPreview = false
    renderKey = 0
}