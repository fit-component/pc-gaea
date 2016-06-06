import * as actions from '../actions'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'

const initialState: Immutable.Map<string, any> = Immutable.Map({})

export default createReducer(initialState, {
    [actions.ROOT_PROPS_INIT]: (state: Immutable.Map<string, any>, action: any) => {
        return state.merge(action.data)
    },
    [actions.ROOT_PROPS_UPDATE_PAGE_INFO]: (state: Immutable.Map<string, any>, action: any) => {
        switch (action.key) {
            case 'childs':
                switch (action.info.type) {
                    case 'add':
                        return state.updateIn([...action.position, 'childs'], (childs: Immutable.List<any>)=> {
                            if (childs) {
                                return childs.push(Immutable.fromJS(action.info.child)) as Immutable.List<any>
                            } else {
                                // 不存在 childs 则新建
                                return Immutable.List.of(Immutable.fromJS(action.info.child))
                            }
                        })
                    case 'remove':
                        return state.updateIn([...action.position, 'childs'], (childs: Immutable.List<any>)=> {
                            return childs.splice(action.info.index, 1)
                        })
                }
                break

            case 'props':
                return state.updateIn([...action.position, 'props'], ()=> {
                    return Immutable.fromJS(action.info)
                })
            case 'name':
                return state.updateIn([...action.position, 'props', 'name'], ()=> {
                    return Immutable.fromJS(action.info)
                })
            case 'reset':
                return state.deleteIn([...action.position, 'props'])
        }
    }
})