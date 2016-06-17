import * as actions from '../actions'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'

export interface StateInterface {
    /**
     * 是否在预览状态
     */
    isPreview?: boolean
}

export class State implements StateInterface {
    isPreview = false
}

const initialState: Immutable.Map<string, any> = Immutable.Map<string, any>(new State())

export default createReducer(initialState, {
    [actions.PREVIEW_CHANGE]: (state: Immutable.Map<string, any>, action: any) => {
        return state.merge({
            isPreview: action.isPreview
        })
    }
})