import {combineReducers} from 'redux'

import components from './components/reducer'
import editBox from './edit-box/reducer'
import outerMoveBox from './outer-move-box/reducer'
import treeMoveBox from './tree-move-box/reducer'
import userSetting from './user-setting/reducer'
import rootProps from './root-props/reducer'
import preview from './preview/reducer'

const rootReducer = combineReducers({
    components,
    editBox,
    outerMoveBox,
    treeMoveBox,
    userSetting,
    rootProps,
    preview
})

export default rootReducer