import * as React from 'react'

export interface PropsInterface {
    /**
     * 编辑盒子信息 这个信息第一次初始化有效,之后都是通知 helper 增量更新,这个值只做初始化
     */
    mergedProps?: any

    /**
     * 是否是根级组件
     */
    isRoot?: boolean
}

export class Props implements PropsInterface {

}

export interface StateInterface {
    /**
     * 组件聚合配置信息
     * props    : {
            name   : '外壳',
            options: {
                width     : {
                    value   : '100%',
                    editable: false
                },
                height    : {
                    value   : '100%',
                    editable: false
                },
                background: {
                    value: 'white'
                }
            }
        }
     */
    mergedProps?: any
}

export class State implements StateInterface {

}