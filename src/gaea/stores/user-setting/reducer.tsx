import * as actions from '../actions'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'

const initialState: Immutable.Map<string, any> = Immutable.Map({
    /**
     * 点击移除时弹出确认框
     */
    confirmOnRemove: true
})

export default createReducer(initialState, {
    [actions.USER_SETTING_IPDATE]: (state: Immutable.Map<string, any>, action: any) => {
        return state.merge({
            [action.key]: action.value
        })
    }
})