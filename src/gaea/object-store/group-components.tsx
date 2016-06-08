import {getToolsComponentsInstance} from './tools-components'

let groupComponents: Array<any> = []

export const addGroupComponent = (component: any)=> {
    groupComponents.push(component)

    // 通知组件栏刷新
    const toolsComponentsInstance = getToolsComponentsInstance()
    toolsComponentsInstance.freshGroup(groupComponents)
}

export const getGroupComponents = ()=> {
    return groupComponents
}