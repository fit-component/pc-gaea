import * as Immutable from 'immutable'
let rootProps = Immutable.Map({})

export const initRootProps = (initObject: any)=> {
    rootProps = Immutable.fromJS(initObject)
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
                    break
                case 'remove':
                    rootProps = rootProps.updateIn([...position, 'childs'], (childs: Immutable.List<any>)=> {
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
}

export const getRootProps = ()=> {
    return rootProps
}