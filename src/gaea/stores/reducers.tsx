import {combineReducers} from 'redux'

import components from './components/reducer'
import editBox from './edit-box/reducer'
import section from './section/reducer'
import outerMoveBox from './outer-move-box/reducer'
import userSetting from './user-setting/reducer'
import rootProps from './root-props/reducer'

const rootReducer = combineReducers({
    components,
    editBox,
    section,
    outerMoveBox,
    userSetting,
    rootProps
})

export default rootReducer