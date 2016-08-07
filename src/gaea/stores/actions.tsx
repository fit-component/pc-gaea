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
export const editBoxShow = (helperInstance: any, dragSourceInstance: any, mergedProps: any, isRoot?: boolean, positions?: Array<string|number>)=> {
    return {
        type: EDIT_BOX_SHOW,
        helperInstance,
        dragSourceInstance,
        mergedProps,
        isRoot,
        positions
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
 * tree-move-box
 * ==================================
 */

/**
 * 显示跟随移动框并设置其位置
 */
export const TREE_MOVE_BOX_MOVE = 'TREE_MOVE_BOX_MOVE'
export const treeMoveBoxMove = (data: any)=> {
    return {
        type: TREE_MOVE_BOX_MOVE,
        data
    }
}

/**
 * 关闭这个移动框
 */
export const TREE_MOVE_BOX_CLOSE = 'TREE_MOVE_BOX_CLOSE'
export const treeMoveBoxClose = ()=> {
    return {
        type: TREE_MOVE_BOX_CLOSE
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

/**
 * ==================================
 * preview 预览
 * ==================================
 */

/**
 * 切换 preview 状态
 */
export const PREVIEW_CHANGE = 'PREVIEW_CHANGE'
export const previewChange = (isPreview: boolean)=> {
    return {
        type: PREVIEW_CHANGE,
        isPreview
    }
}

/**
 * ==================================
 * dom-tree 右下角的区域
 * ==================================
 */

/**
 * 展示内容,并且覆盖掉树内容（树只是隐藏,因为销毁成本很大,这里会展示比如组件预览等状态,当鼠标不在树上和编辑区域的时候,都可以利用这块空间）
 */
export const DOM_TREE_EXTRA_CONTENT_SHOW = 'DOM_TREE_EXTRA_CONTENT_SHOW'
export const domTreeExtraContentShow = (componentName: string)=> {
    return {
        type: DOM_TREE_EXTRA_CONTENT_SHOW,
        componentName
    }
}

/**
 * 隐藏展示内容
 */
export const DOM_TREE_EXTRA_CONTENT_HIDE = 'DOM_TREE_EXTRA_CONTENT_HIDE'
export const domTreeExtraContentHide = ()=> {
    return {
        type: DOM_TREE_EXTRA_CONTENT_HIDE
    }
}

/**
 * ==================================
 * 整体布局
 * ==================================
 */

/**
 * 设置侧边栏宽度
 * @offset 指侧边栏宽度比上次变化的数量
 */
export const LAYOUT_SET_SIDEBAR_WIDTH = 'LAYOUT_SET_SIDEBAR_WIDTH'
export const layoutSetSidebarWidth = (offset: number)=> {
    return {
        type: LAYOUT_SET_SIDEBAR_WIDTH,
        offset
    }
}

/**
 * 侧边栏准备移动,鼠标点下去
 */
export const LAYOUT_SIDEBAR_MOVE_DOWN_START = 'LAYOUT_SIDEBAR_MOVE_DOWN_START'
export const layoutSidebarMoveDownStart = ()=> {
    return {
        type: LAYOUT_SIDEBAR_MOVE_DOWN_START
    }
}

/**
 * 侧边栏准备移动,鼠标抬起来
 */
export const LAYOUT_SIDEBAR_MOVE_DOWN_END = 'LAYOUT_SIDEBAR_MOVE_DOWN_END'
export const layoutSidebarMoveDownEnd = ()=> {
    return {
        type: LAYOUT_SIDEBAR_MOVE_DOWN_END
    }
}