import ViewPort from '../viewport'

let viewPort: ViewPort = null

export const setViewPort = (_viewport: ViewPort)=> {
    viewPort = _viewport
}

export const getViewPort = ()=> {
    return viewPort
}

/**
 * 视图区域的 jquery dom 实体
 */
let viewPort$dom:JQuery

export const setViewPort$dom = (_viewport$dom: JQuery)=> {
    viewPort$dom = _viewport$dom
}

export const getViewPort$dom = ()=> {
    return viewPort$dom
}