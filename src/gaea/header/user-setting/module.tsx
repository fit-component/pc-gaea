import { PluginInfo } from '../../module.tsx'

export interface PropsInterface {
    plugin?: PluginInfo
    handleConfigChange: (key: string, value:any) => void
    userSetting?: any
    userSettingUpdate?: any
}

export class Props implements PropsInterface {
    handleConfigChange: (key: string, value:any) => {}
}

export interface StateInterface {

}

export class State implements StateInterface {
}

export interface IRouterContext {
    pluginInfo: PluginInfo;
}

export interface ISomeOtherContext {
    somethingElse: any;
}
