import History from '../sidebar/tools/history'

let historyComponentInstance: History = null

export const setHistoryComponentInstance = (_historyComponentInstance: History)=> {
    historyComponentInstance = _historyComponentInstance
}

export const getHistoryComponentInstance = ()=> {
    return historyComponentInstance
}