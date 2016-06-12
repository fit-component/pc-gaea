import * as Immutable from 'immutable'
import store from '../utils/configure-store'
import * as actions from '../stores/actions'
import {getDomTree} from './dom-tree'

// 根节点总信息
let rootProps = Immutable.Map({})
// 组件的总数量
let count = 0
// 根节点信息历史数据 全量存储,新的会被 push 到末尾
let rootPropsHistory: Array<Immutable.Map<string,any>> = []

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

    // 添加一条历史纪录
    rootPropsHistory.push(rootProps)
    // :TODO 通知历史树更新
}

export const getRootProps = ()=> {
    return rootProps
}

export const getCount = ()=> {
    return count
}