import * as React from 'react'

export interface PropsDefine {
    /**
     * 自定义组件
     */
    components?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    /**
     * 基础组件
     * web 引用 fit-gaea/lib/web-components
     * react-native 同时兼容 web 引用 fit-gaea/lib/native-components
     */
    baseComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>

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