import * as $ from 'jquery'

/**
 * 设置 domTree 对象实例
 */
let domTree: any = null
export const setDomTree = (_domTree: any)=> {
    domTree = _domTree
}

export const getDomTree = ()=> {
    return domTree
}

/**
 * 设置 domTree 的位置
 */
export interface positionInterface {
    left: number,
    top: number
}

let domTreePosition: positionInterface

export const setDomTreePosition = (_domTreePosition: positionInterface)=> {
    domTreePosition = _domTreePosition
}

export const getDomTreePosition = ()=> {
    return domTreePosition
}

/**
 * 设置 domTree 的 jquery 对象
 */
let $domTree: JQuery
export const set$domTree = (_$domTree: JQuery)=> {
    $domTree = _$domTree
}

export const get$domTree = ()=> {
    return $domTree
}

/**
 * 设置当前选中的 tree 元素实例
 */
let selectedTreeInstance: any = null
export const setSelectedTreeAndUnselectBefore = (treeInstance: any)=> {
    if (selectedTreeInstance !== null) {
        selectedTreeInstance.setSelected(false)
    }
    selectedTreeInstance = treeInstance
}

/**
 * 让 domTree 滚动条滑动到这个 tree 元素实例位置
 * @param $treeElement
 */
export const scrollToTreeElement = ($treeElement: JQuery)=> {
    $domTree.scrollTop($treeElement.offset().top)
}

/**
 * 反选最后一个 tree
 */
export const unSelectLastTree = ()=> {
    if (selectedTreeInstance !== null) {
        selectedTreeInstance.setSelected(false)
    }
}