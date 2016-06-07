import * as actions from '../actions'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'
import {
    setCurrentSelectedDragSourceInstance,
    setCurrentSelectedHelperInstance,
    getCurrentSelectedDragSourceInstance
} from '../../object-store/current-selection'

const initialState: Immutable.Map<string, any> = Immutable.Map({
    show: false,
    mergedProps: {},
    isNewInstance: false,
    isRoot: false
})

export default createReducer(initialState, {
    [actions.EDIT_BOX_SHOW]: (state: Immutable.Map<string, any>, action: any) => {
        const isNewInstance = setCurrentSelectedHelperInstance(action.helperInstance)
        setCurrentSelectedDragSourceInstance(action.dragSourceInstance)

        return state.merge({
            show: true,
            mergedProps: action.mergedProps,
            isRoot: action.isRoot,
            isNewInstance
        })
    },
    [actions.EDIT_BOX_CLOSE]: (state: Immutable.Map<string, any>, action: any) => {
        // 现在要关闭窗口,先调用 dragSource 的关闭方法,设置其为非选中状态
        const currentDragSourceInstance: any = getCurrentSelectedDragSourceInstance()
        currentDragSourceInstance && currentDragSourceInstance.setSelected(false)

        return state.merge({
            show: false
        })
    },
    [actions.EDIT_BOX_SET_IS_NEW_INSTANCE]: (state: Immutable.Map<string, any>, action: any) => {
        return state.merge({
            isNewInstance: action.isNewInstance
        })
    },
    [actions.EDIT_BOX_DELETE_CLOSE]: (state: Immutable.Map<string, any>, action: any) => {
        setCurrentSelectedHelperInstance(null)
        setCurrentSelectedDragSourceInstance(null)

        return state.merge({
            show: false
        })
    },
    [actions.EDIT_BOX_UPDATE]: (state: Immutable.Map<string, any>, action: any) => {
        return state.merge({
            isNewInstance: true,
            mergedProps: action.mergedProps
        })
    }
})