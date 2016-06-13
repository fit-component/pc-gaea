import * as $ from 'jquery'
import DomTree from '../sidebar/dom-tree'

/**
 * 设置 domTree 对象实例
 */
let domTree: any = null
export const setDomTree = (_domTree: DomTree)=> {
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
    // 如果上一个选中存在,并且不是这个,则先取消选中上一个
    if (selectedTreeInstance !== null && selectedTreeInstance !== treeInstance) {
        selectedTreeInstance.setSelected(false)
    }
    selectedTreeInstance = treeInstance
}

/**
 * 选中当前选中的 tree 元素实例
 */
export const clearSelectedTree = ()=> {
    selectedTreeInstance = null
}

/**
 * 获得当前选中的 tree 元素实例
 */
export const getSelectedTree = ()=> {
    return selectedTreeInstance
}

/**
 * 让 domTree 滚动条滑动到这个 tree 元素实例位置
 */
export const scrollToTreeElement = ($treeElement: JQuery)=> {
    $domTree.stop().animate({
        scrollTop: $treeElement.offset().top - $domTree.offset().top + $domTree.scrollTop() - 50
    }, 100)
}

/**
 * 反选最后一个 tree
 */
export const unSelectLastTree = ()=> {
    if (selectedTreeInstance !== null) {
        selectedTreeInstance.setSelected(false)
        selectedTreeInstance = null
    }
}