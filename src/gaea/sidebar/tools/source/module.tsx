import * as React from 'react'

export interface SourceFile {
    /**
     * 文件类型
     */
        type: string

    /**
     * 文件名
     */
    name: string

    /**
     * 序号,排在第几
     */
    order: number
}

export interface PropsInterface {
    /**
     * 完整路径
     */
    path?: Array<string>

    /**
     * 当路径发生变化
     */
    onPathChange?: (path: Array<string>)=>void
}

export class Props implements PropsInterface {
    path = ['/'] as any
}

export interface StateInterface {
    /**
     * 当前内容列表
     */
    lists?: Array<SourceFile>
}

export class State implements StateInterface {
    lists = [] as any
}