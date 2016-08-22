import * as React from 'react'

export interface PropsDefine {
    /**
     * 外部提供编辑组件
     */
    components?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    /**
     * 页面信息
     */
    value?: {
        [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
    }
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}