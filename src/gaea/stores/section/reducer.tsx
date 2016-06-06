import * as actions from '../actions'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'

const initialState: Immutable.Map<string, any> = Immutable.Map({})

export default createReducer(initialState, {
    [actions.SECTION_SET_POSITION]: (state: Immutable.Map<string, any>, action: any) => {
        return state.merge(action.position)
    }
})