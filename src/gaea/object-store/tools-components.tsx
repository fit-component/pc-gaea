let toolsComponentsInstance: any = null

export const setToolsComponentsInstance = (_toolsComponentsInstance: any)=> {
    toolsComponentsInstance = _toolsComponentsInstance
}

export const getToolsComponentsInstance = ()=> {
    return toolsComponentsInstance
}