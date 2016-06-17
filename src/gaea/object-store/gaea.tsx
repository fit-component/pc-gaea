import Gaea from '../../gaea'
let gaea: Gaea

export const setGaea = (_gaea: Gaea)=> {
    gaea = _gaea
}

export const getGaea = ()=> {
    return gaea
}