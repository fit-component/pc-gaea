import * as actions from '../actions'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'

const initialState: Immutable.Map<string, any> = Immutable.Map<string, any>({
    extraContent: {
        type: ''
    }
})

export default createReducer(initialState, {
    [actions.DOM_TREE_EXTRA_CONTENT_SHOW]: (state: Immutable.Map<string, any>, action: any) => {
        return state.mergeDeep({
            extraContent: {
                componentPreviewName: action.componentName,
                type: 'componentPreview'
            }
        })
    },
    [actions.DOM_TREE_EXTRA_CONTENT_HIDE]: (state: Immutable.Map<string, any>, action: any) => {
        return state.mergeDeep({
            extraContent: {
                type: ''
            }
        })
    }
})