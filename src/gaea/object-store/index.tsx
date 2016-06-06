let currentSelectedHelperInstance: any = null
let currentSelectedDragSourceInstance: any = null

export const setCurrentSelectedHelperInstance = (helperInstance: any): boolean=> {
    const isNewInstance = currentSelectedHelperInstance !== helperInstance
    currentSelectedHelperInstance = helperInstance
    return isNewInstance
}

export const setCurrentSelectedDragSourceInstance = (dragSourceInstance: any): boolean=> {
    const isNewInstance = currentSelectedDragSourceInstance !== dragSourceInstance
    currentSelectedDragSourceInstance = dragSourceInstance
    return isNewInstance
}

export const getCurrentSelectedHelperInstance = ()=> {
    return currentSelectedHelperInstance
}

export const getCurrentSelectedDragSourceInstance = ()=> {
    return currentSelectedDragSourceInstance
}