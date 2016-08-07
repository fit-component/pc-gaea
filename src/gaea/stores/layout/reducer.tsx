import * as actions from '../actions'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'

declare namespace Models {

}

const initialState: Immutable.Map<string, any> = Immutable.Map({
    sidebarWidth: 240,
    sidebarMoveMouseDown: false
})

export default createReducer(initialState, {
    [actions.LAYOUT_SET_SIDEBAR_WIDTH]: (state: Immutable.Map<string, any>, action: any) => {
        let sidebarWidth = Number(state.get('sidebarWidth')) - action.offset
        if (sidebarWidth > 600) {
            sidebarWidth = 600
        }
        if (sidebarWidth < 160) {
            sidebarWidth = 160
        }
        return state.mergeDeep({
            sidebarWidth: sidebarWidth
        })
    },
    [actions.LAYOUT_SIDEBAR_MOVE_DOWN_START]: (state: Immutable.Map<string, any>, action: any) => {
        return state.mergeDeep({
            sidebarMoveMouseDown: true
        })
    },
    [actions.LAYOUT_SIDEBAR_MOVE_DOWN_END]: (state: Immutable.Map<string, any>, action: any) => {
        return state.mergeDeep({
            sidebarMoveMouseDown: false
        })
    }
})