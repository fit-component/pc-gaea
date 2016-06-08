import * as actions from '../actions'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'

const initialState: Immutable.Map<string, any> = Immutable.Map({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    show: false
})

export default createReducer(initialState, {
    [actions.TREE_MOVE_BOX_MOVE]: (state: Immutable.Map<string, any>, action: any) => {
        return state.merge({
            left: action.data.left,
            top: action.data.top,
            width: action.data.width,
            height: action.data.height,
            show: true
        })
    },
    [actions.TREE_MOVE_BOX_CLOSE]: (state: Immutable.Map<string, any>, action: any) => {
        return state.merge({
            show: false
        })
    }
})