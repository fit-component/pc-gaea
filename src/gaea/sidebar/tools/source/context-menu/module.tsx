import * as React from 'react'

export interface PropsInterface {
    /**
     * 当前路径
     */
    path?: Array<string>
}

export class Props implements PropsInterface {

}

export interface StateInterface {
    /**
     * 添加脚本模态框是否显示
     */
    showAddScript?: boolean

    /**
     * 添加脚本文件名
     */
    addScriptLabelValue?: string
}

export class State implements StateInterface {
    showAddScript = false
}