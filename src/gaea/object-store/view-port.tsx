import ViewPort from '../viewport'

let viewPort: ViewPort = null

export const setViewPort = (_viewport: ViewPort)=> {
    viewPort = _viewport
}

export const getViewPort = ()=> {
    return viewPort
}