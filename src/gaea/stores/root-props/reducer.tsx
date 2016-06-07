import * as actions from '../actions'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'

const initialState: Immutable.Map<string, any> = Immutable.Map({
    changeCount: 0
})

export default createReducer(initialState, {
    [actions.ROOT_PROPS_CHANGE]: (state: Immutable.Map<string, any>, action: any) => {
        return state.set('changeCount', state.get('changeCount') + 1)
    }
})