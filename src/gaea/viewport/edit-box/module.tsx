import * as React from 'react'

export interface PropsInterface {
    /**
     * 编辑盒子信息
     */
    editBox?: {
        show?: boolean,
        isNewInstance?: boolean
        isRoot?: boolean,
        mergedProps?: any
        /**
         * 当前组件位置信息
         */
        positions?: Array<string|number>
    }

    /**
     * 关闭盒子的action
     */
    editBoxClose?: ()=>void

    /**
     * editBoxSetIsNew action
     */
    editBoxSetIsNew?: (isNewInstance: boolean)=>void
}

export class Props implements PropsInterface {

}

export interface StateInterface {
    offsetLeft?: number
    offsetTop?: number
}

export class State implements StateInterface {
    offsetLeft = -1
    offsetTop = 0
}