import * as React from 'react'
import {HistoryInfo, Version} from '../../../object-store/root-props'

export interface PropsInterface {

}

export class Props implements PropsInterface {

}

export interface StateInterface {
    /**
     * 操作记录
     */
    historys?: Array<HistoryInfo>

    /**
     * 版本快照
     */
    versions?: Array<Version>

    /**
     * 版本快照是否还有更多
     */
    versionHasNext?: boolean

    /**
     * 当前是历史纪录第几个
     */
    nowIndex?: number

    /**
     * 当前选中的类型
     */
    selectedType?: string
}

export class State implements StateInterface {
    historys = [] as any
    versions = [] as any
    versionHasNext = false
    nowIndex = 0
    selectedType = 'version'
}