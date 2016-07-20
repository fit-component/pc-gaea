import {StateInterface as ReduxPreviewStateInterface} from '../stores/preview/reducer'
import {PluginInfo} from '../module'

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

export interface IRouterContext {
    pluginInfo: PluginInfo
}

export interface ISomeOtherContext {
    somethingElse: any
}

export interface itemMapType {
    save: JSX.Element,
    preview: JSX.Element,
    redo: JSX.Element,
    undo: JSX.Element,
    [key: string]: JSX.Element
}

export interface extendConfigStore {
    [key: string]: any
}