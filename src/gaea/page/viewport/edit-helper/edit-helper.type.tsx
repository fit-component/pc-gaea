import * as React from 'react'
import Application from '../../../store/application'
import Viewport from '../../../store/viewport'

export interface PropsDefine {
    /**
     * store map 中的唯一 id
     */
    mapUniqueKey ?: string

    application?: Application
    viewport?: Viewport
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否被选中
     */
    selected?: boolean
}

export class State implements StateDefine {
    selected = false
}