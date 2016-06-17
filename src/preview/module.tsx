import * as React from 'react'

export interface PropsInterface {
    /**
     * 外部提供编辑组件
     */
    components?: Array<React.Component<any ,any>>

    /**
     * 信息
     */
    componentInfo?: any
}

export class Props implements PropsInterface {

}

export interface StateInterface {

}

export class State implements StateInterface {

}