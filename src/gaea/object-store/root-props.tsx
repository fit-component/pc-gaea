import * as Immutable from 'immutable'
import store from '../utils/configure-store'
import * as actions from '../stores/actions'
import {getDomTree} from './dom-tree'
import {getHistoryComponentInstance} from './history-component'
import {getHeaderComponentInstance} from './header'
import {getViewPort} from './view-port'

export interface HistoryInfo {
    operateName: string,
    date: any,
    info: any
}

// 根节点总信息
let rootProps = Immutable.Map({})
// 组件的总数量
let count = 0
// 根节点信息历史数据 全量存储,新的会被 push 到末尾
let historys: Array<HistoryInfo> = []
// 当前是历史纪录第几个
let nowHistoryIndex = 0

// 根据一个组件对象,获取一共有多少子元素（包含自己）
const getAllCountWithChildren = (info: any)=> {
    // 上来自己就算一个
    let tempCount = 1

    // 都一样,就深度优先遍历吧
    const searchChilds = (childs: Array<any>)=> {
        if (!childs)return

        childs.forEach((child: any)=> {
            if (child.childs) {
                searchChilds(child.childs)
            }
            tempCount++
        })
    }
    searchChilds(info.childs)

    return tempCount
}

export const initRootProps = (initObject: any)=> {
    rootProps = Immutable.fromJS(initObject)
    // 减去根节点,根节点不能拖拽,不算一个活动的元素
    count = getAllCountWithChildren(initObject.pageInfo) - 1

    // 添加初始化历史纪录
    // 如果有历史纪录覆盖,则这里不记录初始历史
    saveToHistory('初始化')
}

export const setRootProps = (position: Array<number|string>, key: string, info: any)=> {
    switch (key) {
        case 'childs':
            switch (info.type) {
                case 'add':
                    rootProps = rootProps.updateIn([...position, 'childs'], (childs: Immutable.List<any>)=> {
                        if (childs) {
                            return childs.push(Immutable.fromJS(info.child)) as Immutable.List<any>
                        } else {
                            // 不存在 childs 则新建
                            return Immutable.List.of(Immutable.fromJS(info.child))
                        }
                    })

                    count += getAllCountWithChildren(info.child)

                    break
                case 'remove':
                    rootProps = rootProps.updateIn([...position, 'childs'], (childs: Immutable.List<any>)=> {
                        count -= getAllCountWithChildren(childs.get(info.index).toJS())
                        return childs.splice(info.index, 1)
                    })
                    break
            }
            break

        case 'props':
            rootProps = rootProps.updateIn([...position, 'props'], ()=> {
                return Immutable.fromJS(info)
            })
            break

        case 'name':
            rootProps = rootProps.updateIn([...position, 'props', 'name'], ()=> {
                return Immutable.fromJS(info)
            })
            break

        case 'reset':
            rootProps = rootProps.deleteIn([...position, 'props'])
            break
    }
    store.dispatch(actions.rootPropsChange())

    // 让 domTree 更新组件数量
    const domTree = getDomTree()
    domTree.setCount(count)
}

export const getRootProps = ()=> {
    return rootProps
}

export const getCount = ()=> {
    return count
}

/**
 * 获取历史纪录列表
 */
export const getHistorys = ()=> {
    return historys
}

/**
 * 保存为历史纪录
 */
export const saveToHistory = (operateName: string)=> {
    // 添加一条历史纪录
    const historyInfo: HistoryInfo = {
        operateName: operateName,
        date: new Date(),
        info: rootProps.toJS().pageInfo
    }

    // 如果当前历史位置不在历史纪录的末尾,则先把之后的历史纪录都删除再添加
    if (nowHistoryIndex < historys.length - 1) {
        historys = historys.slice(0, nowHistoryIndex + 1)
    }

    historys.push(historyInfo)

    const historyComponent = getHistoryComponentInstance()
    nowHistoryIndex = historys.length - 1
    if (historyComponent) {
        // 如果切换过 history tab,才会初始化,所以这里判断一下
        historyComponent.addHistory(historys, nowHistoryIndex)
    }

    // 设置 header 的 canUndo canRedo
    const headerInstance = getHeaderComponentInstance()
    if (headerInstance) {
        // header 实例会比这个实例晚初始化,所以先判断存不存在
        headerInstance.setCanUndoRedo(nowHistoryIndex > 0, nowHistoryIndex < historys.length - 1)
    }
}

/**
 * 设置根节点的 pageInfo
 */
export const setRootPropsPageInfo = (pageInfo: any)=> {
    rootProps = rootProps.set('pageInfo', Immutable.fromJS(pageInfo))
}

/**
 * 设置历史纪录位置
 */
export const setNowHistoryIndex = (index: number)=> {
    nowHistoryIndex = index
}

/**
 * 获取历史纪录位置
 */
export const getNowHistoryIndex = ()=> {
    return nowHistoryIndex
}

/**
 * 恢复到某个历史快照
 */
export const jumpHistoryByIndex = (index: number)=> {
    // 使用 deepClone 方式元历史数据被改变
    const cloneInfo = _.cloneDeep(historys[index].info)

    // viewport domTree 都刷新
    const viewportInstance = getViewPort()
    viewportInstance.freshView(cloneInfo)
    const domTreeInstance = getDomTree()
    domTreeInstance.freshView(cloneInfo)

    // 更新根节点存储的信息
    setRootPropsPageInfo(cloneInfo)

    // 通知 root-props 更新历史的 index
    setNowHistoryIndex(index)

    // 设置 header 的 canUndo canRedo
    const headerInstance = getHeaderComponentInstance()
    headerInstance.setCanUndoRedo(nowHistoryIndex > 0, nowHistoryIndex < historys.length - 1)
}

/**
 * 历史记录后退
 */
export const undoHistory = ()=> {
    const historyInstance = getHistoryComponentInstance()
    nowHistoryIndex -= 1
    if (nowHistoryIndex < 0) {
        nowHistoryIndex = 0
    }

    // 如果历史 tab 存在,优先调用历史 tab,否则在这里处理数据
    if (historyInstance) {
        historyInstance.jumpHistoryByIndex(nowHistoryIndex)
    } else {
        jumpHistoryByIndex(nowHistoryIndex)
    }
}

/**
 * 历史记录前进
 */
export const redoHistory = ()=> {
    const historyInstance = getHistoryComponentInstance()
    nowHistoryIndex += 1
    if (nowHistoryIndex > historys.length - 1) {
        nowHistoryIndex = historys.length - 1
    }

    // 如果历史 tab 存在,优先调用历史 tab,否则在这里处理数据
    if (historyInstance) {
        historyInstance.jumpHistoryByIndex(nowHistoryIndex)
    } else {
        jumpHistoryByIndex(nowHistoryIndex)
    }
}