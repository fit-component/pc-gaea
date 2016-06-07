let currentSelectedHelperInstance: any = null
let currentSelectedDragSourceInstance: any = null

export const setCurrentSelectedHelperInstance = (helperInstance: any): boolean=> {
    const isNewInstance = currentSelectedHelperInstance !== helperInstance
    currentSelectedHelperInstance = helperInstance
    return isNewInstance
}

export const setCurrentSelectedDragSourceInstance = (dragSourceInstance: any): boolean=> {
    // 又选中了一个,如果有 dragSource 就先设置为非选中
    // 当必须在当前和上一个不同的时候,否则相同时就不会选中了
    currentSelectedDragSourceInstance && currentSelectedDragSourceInstance !== dragSourceInstance && currentSelectedDragSourceInstance.setSelected(false)

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