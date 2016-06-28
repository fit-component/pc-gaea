import * as Immutable from 'immutable'
import store from '../utils/configure-store'
import * as actions from '../stores/actions'
import {getDomTree} from './dom-tree'
import {getHistoryComponentInstance} from './history-component'
import {getHeaderComponentInstance} from './header'
import {getViewPort} from './view-port'
import {getGaea} from './gaea'
import * as diff from 'immutablediff'
import * as patch from 'immutablepatch'

export interface HistoryInfo {
    operateName: string,
    date: Date,
    frontDiff: Immutable.List<Array<Immutable.Map<string, any>>>,
    backDiff: Immutable.List<Array<Immutable.Map<string, any>>>
}

export interface Version {
    /**
     * 保存时间
     */
    date: Date,

    /**
     * 完整信息
     */
    info: any,

    /**
     * 唯一标识
     */
    id: string,

    /**
     * 是否已发布
     */
    isPublished?: boolean,

    /**
     * 发布的版本号
     */
    publishCode?: string

    /**
     * 发布的备注
     */
    remarks?: string
}

// 根节点总信息
let rootProps = Immutable.Map({})
// 上一次修改的 pageInfo 信息,这个信息会被 saveToHistory 保存后更新到最新 PageInfo
let lastPageInfo: Immutable.Map<string, any>
// 组件的总数量
let count = 0
// 根节点信息历史数据 全量存储,新的会被 push 到末尾（本地）
let historys: Array<HistoryInfo> = []
// 当前是历史纪录第几个
let nowHistoryIndex = 0
// 版本快照,全量数据存储（可能从网络拉取,需要手动触发才会保存）
let versions: Array<Version> = []
// 是否已经初始化请求了版本信息
let hasInitVersion: boolean = false
// 记录最新版本号,因为会随着发布而增加（注意,数据库要做对应的存储,不然刷新后对应不上）
let newestVersion: string

// 根据一个组件对象,获取一共有多少子元素（包含自己）
const getAllCountWithChildren = (info: any) => {
    // 上来自己就算一个
    let tempCount = 1

    // 都一样,就深度优先遍历吧
    const searchChilds = (childs: Array<any>) => {
        if (!childs) return

        childs.forEach((child: any) => {
            if (child.childs) {
                searchChilds(child.childs)
            }
            tempCount++
        })
    }
    searchChilds(info.childs)

    return tempCount
}

export const initRootProps = (initObject: any) => {
    rootProps = Immutable.fromJS(initObject)
    lastPageInfo = rootProps.get('pageInfo') as Immutable.Map<string, any>
    // 减去根节点,根节点不能拖拽,不算一个活动的元素
    count = getAllCountWithChildren(initObject.pageInfo) - 1

    // 获取版本号
    newestVersion = rootProps.get('version') as string

    // 添加初始化历史纪录
    // 如果有历史纪录覆盖,则这里不记录初始历史
    saveToHistory('初始化')
}

export const setRootProps = (position: Array<number | string>, key: string, info: any) => {
    switch (key) {
        case 'childs':
            switch (info.type) {
                case 'add':
                    rootProps = rootProps.updateIn([...position, 'childs'], (childs: Immutable.List<any>) => {
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
                    rootProps = rootProps.updateIn([...position, 'childs'], (childs: Immutable.List<any>) => {
                        count -= getAllCountWithChildren(childs.get(info.index).toJS())
                        return childs.splice(info.index, 1)
                    })

                    // 如果这时候 childs 长度是 0,直接把 childs 删除
                    if (rootProps.getIn([...position, 'childs']).size === 0) {
                        rootProps = rootProps.deleteIn([...position, 'childs'])
                    }

                    break
            }
            break

        case 'props':
            rootProps = rootProps.updateIn([...position, 'props'], () => {
                return Immutable.fromJS(info)
            })
            break

        case 'name':
            rootProps = rootProps.updateIn([...position, 'props', 'name'], () => {
                return Immutable.fromJS(info)
            })
            break

        case 'reset':
            rootProps = rootProps.deleteIn([...position, 'props'])
            break

        case 'replace':
            // 整体替换 pageInfo
            rootProps = rootProps.updateIn(['pageInfo'], () => {
                return Immutable.fromJS(info)
            })
            break
    }
    store.dispatch(actions.rootPropsChange())

    // 让 domTree 更新组件数量
    const domTree = getDomTree()
    domTree.setCount(count)
}

export const getRootProps = () => {
    return rootProps
}

export const getCount = () => {
    return count
}

/**
 * 获取历史纪录列表
 */
export const getHistorys = () => {
    return historys
}

/**
 * 保存为历史纪录
 */
export const saveToHistory = (operateName: string) => {
    // 获得与当前页面信息的 diff
    const frontDiff = diff(rootProps.get('pageInfo'), lastPageInfo)
    const backDiff = diff(lastPageInfo, rootProps.get('pageInfo'))

    console.log('frontDiff:', frontDiff.toJS())
    console.log('endDiff:', backDiff.toJS())

    // 获取完了 diff,就把 lastPageInfo 更新成为最新的
    lastPageInfo = rootProps.get('pageInfo') as Immutable.Map<string, any>

    // 添加一条历史纪录
    const historyInfo: HistoryInfo = {
        operateName: operateName,
        date: new Date(),
        frontDiff,
        backDiff
    }

    // 如果当前历史位置不在历史纪录的末尾,则先把之后的历史纪录都删除再添加
    // 也就是说,每次添加的新历史纪录,一定是在当前 rootProps.pageInfo 基础上修改的!
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
export const setRootPropsPageInfo = (pageInfo: any) => {
    rootProps = rootProps.set('pageInfo', Immutable.fromJS(pageInfo))
}

/**
 * 设置历史纪录位置
 */
export const setNowHistoryIndex = (index: number) => {
    nowHistoryIndex = index
}

/**
 * 获取历史纪录位置
 */
export const getNowHistoryIndex = () => {
    return nowHistoryIndex
}

/**
 * 恢复到某个历史快照
 */
export const jumpHistoryByIndex = (index: number) => {
    let targetHistoryInfo: Immutable.Map<string, any> = lastPageInfo

    // 使用 patch,根据历史纪录顺藤摸瓜依次恢复历史纪录
    if (index === nowHistoryIndex) return
    if (index > nowHistoryIndex) {
        // 前进到距离当前之后的快照,使用 backDiff,执行当前的 backDiff,执行其它的 backDiff
        for (let i = nowHistoryIndex; i <= index; i++) {
            targetHistoryInfo = patch(targetHistoryInfo, historys[i].backDiff)
        }
    } else {
        // 恢复到之前的快照,使用 frontDiff,执行当前的 frontDiff,不执行目标的 frontDiff
        for (let i = nowHistoryIndex; i > index; i--) {
            targetHistoryInfo = patch(targetHistoryInfo, historys[i].frontDiff)
        }
    }

    // 重置 lastPageInfo
    lastPageInfo = targetHistoryInfo

    // 使用 deepClone 方式元历史数据被改变
    const cloneInfo = _.cloneDeep(targetHistoryInfo.toJS())

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
 * 立刻用某个配置把页面信息覆盖掉
 */
export const freshViewPort = (info: any, historyDescription: string) => {
    // 更新 rootProps
    setRootProps(null, 'replace', info)

    // 新增一个历史记录
    saveToHistory(historyDescription)

    // 使用 deepClone 方式元数据被改变
    const cloneInfo = _.cloneDeep(info)

    // viewport domTree 都刷新
    const viewportInstance = getViewPort()
    viewportInstance.freshView(cloneInfo)
    const domTreeInstance = getDomTree()
    domTreeInstance.freshView(cloneInfo)

    // 更新根节点存储的信息
    setRootPropsPageInfo(cloneInfo)

    // 设置 header 的 canUndo canRedo
    const headerInstance = getHeaderComponentInstance()
    headerInstance.setCanUndoRedo(nowHistoryIndex > 0, nowHistoryIndex < historys.length - 1)
}

/**
 * 历史记录后退
 */
export const undoHistory = () => {
    const historyInstance = getHistoryComponentInstance()

    // 如果历史 tab 存在,优先调用历史 tab,否则在这里处理数据
    if (historyInstance) {
        historyInstance.jumpHistoryByIndex(nowHistoryIndex - 1)
    } else {
        jumpHistoryByIndex(nowHistoryIndex - 1)
    }
}

/**
 * 历史记录前进
 */
export const redoHistory = () => {
    const historyInstance = getHistoryComponentInstance()

    // 如果历史 tab 存在,优先调用历史 tab,否则在这里处理数据
    if (historyInstance) {
        historyInstance.jumpHistoryByIndex(nowHistoryIndex + 1)
    } else {
        jumpHistoryByIndex(nowHistoryIndex + 1)
    }
}

/**
 * 头部新增 version
 * 记录的是当前的版本,只要传入唯一标识:id
 */
export const addVersion = (id: string) => {
    const pageinfo: any = rootProps.get('pageInfo')
    const info: any = pageinfo.toJS()

    versions.push({
        date: new Date(),
        info: info,
        id
    })

    // 通知 history 组件更新版本信息
    const historyInstance = getHistoryComponentInstance()
    if (historyInstance) {
        historyInstance.freshVersionBySave(versions)
    }
}

/**
 * 初次请求获取版本信息
 */
export const getInitVersion = () => {
    if (hasInitVersion) return
    hasInitVersion = true

    const gaea = getGaea()
    gaea.props.versionInit((networkOrMockVersions: Array<Version>, hasNext?: boolean) => {
        networkOrMockVersions.forEach(item => {
            versions.unshift(item)
        })

        // 通知 history 组件更新版本信息
        const historyInstance = getHistoryComponentInstance()
        if (historyInstance) {
            historyInstance.freshVersion(versions, hasNext)
        }
    })
}

/**
 * 请求获取更多版本列表信息
 */
export const loadMoreVersion = () => {
    const gaea = getGaea()
    gaea.props.onLoadMoreVersionClick((networkOrMockVersions: Array<Version>, hasNext?: boolean) => {
        networkOrMockVersions.forEach(item => {
            versions.unshift(item)
        })

        // 通知 history 组件更新版本信息
        const historyInstance = getHistoryComponentInstance()
        if (historyInstance) {
            historyInstance.freshVersion(versions, hasNext)
        }
    })
}

/**
 * 修改版本列表信息,把某一个列为已发布
 */
export const changeVersionStatu = (id: string, version: string, remarks: string) => {
    versions = versions.map<Version>((item: Version) => {
        if (item.id === id) {
            item.isPublished = true
            item.publishCode = version
            item.remarks = remarks
        }
        return item
    })

    // 通知 history 组件更新版本信息
    const historyInstance = getHistoryComponentInstance()
    if (historyInstance) {
        historyInstance.freshVersionBySave(versions)
    }
}

/**
 * 获取版本列表信息
 */
export const getVersions = () => {
    return versions
}

/**
 * 获取最新版本号
 */
export const getNewestVersion = () => {
    return newestVersion
}

/**
 * 设置最新版本号
 */
export const setNewestVersion = (version: string) => {
    newestVersion = version
}