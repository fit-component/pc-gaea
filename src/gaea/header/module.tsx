import {StateInterface as ReduxPreviewStateInterface} from '../stores/preview/reducer'

export interface PropsInterface {
    preview?: ReduxPreviewStateInterface
    userSetting?: any
}

export class Props implements PropsInterface {

}

export interface StateInterface {
    /**
     * 是否能 undo
     */
    canUndo?: boolean

    /**
     * 是否能 redo
     */
    canRedo?: boolean
}

export class State implements StateInterface {
    canUndo = false
    canRedo = false
}