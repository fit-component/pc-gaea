/**
 * ==================================
 * components
 * ==================================
 */

/**
 * 初始化所有组件信息
 */
export const COMPONENTS_INIT = 'COMPONENTS_INIT'
export const componentsInit = (data: any)=> {
    return {
        type: COMPONENTS_INIT,
        data
    }
}

/**
 * ==================================
 * edit-box
 * ==================================
 */

/**
 * 显示editBox并赋值信息
 */
export const EDIT_BOX_SHOW = 'EDIT_BOX_SHOW'
export const editBoxShow = (helperInstance: any, dragSourceInstance: any, mergedProps: any, isRoot?: boolean)=> {
    return {
        type: EDIT_BOX_SHOW,
        helperInstance,
        dragSourceInstance,
        mergedProps,
        isRoot
    }
}

/**
 * 更新editBox的信息
 */
export const EDIT_BOX_UPDATE = 'EDIT_BOX_UPDATE'
export const editBoxUpdate = (mergedProps: any)=> {
    return {
        type: EDIT_BOX_UPDATE,
        mergedProps
    }
}

/**
 * 关闭editBox
 */
export const EDIT_BOX_CLOSE = 'EDIT_BOX_CLOSE'
export const editBoxClose = ()=> {
    return {
        type: EDIT_BOX_CLOSE
    }
}

/**
 * 关闭editBox并清空组件,删除时候调用
 */
export const EDIT_BOX_DELETE_CLOSE = 'EDIT_BOX_DELETE_CLOSE'
export const editBoxDeleteClose = ()=> {
    return {
        type: EDIT_BOX_DELETE_CLOSE
    }
}

/**
 * 设置editBox 的 isNewInstance 为 false
 * 在 isNewInstance 设置为 true 后,立即调用,就是为了防止其它 action 触发时强制刷新 editBox
 * 目前已知的风险是,如果不这么做,更新了 editBox 组件信息,调用 currentSelectedHelperBox 更新了组件信息,会触发 action 更新 rootProps,如果这里 isNewInstance 没有设置为 false, 编辑器会悲剧的再刷新一次
 */
export const EDIT_BOX_SET_IS_NEW_INSTANCE = 'EDIT_BOX_SET_IS_NEW_INSTANCE'
export const editBoxSetIsNew = (isNewInstance: boolean)=> {
    return {
        type: EDIT_BOX_SET_IS_NEW_INSTANCE,
        isNewInstance
    }
}

/**
 * ==================================
 * section
 * ==================================
 */

/**
 * 更新 section 的位置信息
 */
export const SECTION_SET_POSITION = 'SECTION_SET_POSITION'
export const sectionSetPosition = (position: any)=> {
    return {
        type: SECTION_SET_POSITION,
        position
    }
}

/**
 * ==================================
 * outer-move-box
 * ==================================
 */

/**
 * 显示跟随移动框并设置其位置
 */
export const OUT_MOVE_BOX_MOVE = 'OUT_MOVE_BOX_MOVE'
export const outMoveBoxMove = (data: any)=> {
    return {
        type: OUT_MOVE_BOX_MOVE,
        data
    }
}

/**
 * 关闭这个移动框
 */
export const OUT_MOVE_BOX_CLOSE = 'OUT_MOVE_BOX_CLOSE'
export const outMoveBoxClose = ()=> {
    return {
        type: OUT_MOVE_BOX_CLOSE
    }
}

/**
 * ==================================
 * user-setting
 * ==================================
 */

/**
 * 修改用户设置
 */
export const USER_SETTING_IPDATE = 'USER_SETTING_IPDATE'
export const userSettingUpdate = (key: string, value: any)=> {
    return {
        type: USER_SETTING_IPDATE,
        key,
        value
    }
}

/**
 * ==================================
 * root-props 很薄的一层,主要用来触发修改root-props的事件,数据还是从 object-store/root-props 里查询
 * ==================================
 */

/**
 * 修改用户设置
 */
export const ROOT_PROPS_CHANGE = 'ROOT_PROPS_CHANGE'
export const rootPropsChange = ()=> {
    return {
        type: ROOT_PROPS_CHANGE
    }
}