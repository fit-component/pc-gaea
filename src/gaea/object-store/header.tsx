import Header from '../header'

let headerComponentInstance: Header = null

export const setHeaderComponentInstance = (_headerComponentInstance: Header)=> {
    headerComponentInstance = _headerComponentInstance
}

export const getHeaderComponentInstance = ()=> {
    return headerComponentInstance
}