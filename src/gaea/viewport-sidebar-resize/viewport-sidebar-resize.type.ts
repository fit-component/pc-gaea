export interface PropsDefine {

}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否处于在上面按住鼠标的状态
     */
    isMouseTapping?: boolean
}

export class State implements StateDefine {
    isMouseTapping = false
}