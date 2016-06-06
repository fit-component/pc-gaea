import {bindActionCreators} from 'redux'
import {connect, MapStateToProps} from 'react-redux'

export default (state: MapStateToProps<any, any>, actions: any) => {
    const func: any = () => {
        return connect(
            state,
            dispatch => bindActionCreators(actions, dispatch))
    }
    return func()
}