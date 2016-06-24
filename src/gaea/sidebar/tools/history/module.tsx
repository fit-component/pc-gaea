import * as React from 'react'
import {HistoryInfo} from '../../../object-store/root-props'

export interface PropsInterface {

}

export class Props implements PropsInterface {

}

export interface StateInterface {
    historys?: Array<HistoryInfo>

    /**
     * 当前是历史纪录第几个
     */
    nowIndex?: number
}

export class State implements StateInterface {
    historys = [] as any
    nowIndex = 0
}