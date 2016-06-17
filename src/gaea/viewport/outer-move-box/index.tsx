import * as React from 'react'
import connect from '../../utils/connect'
import * as module from './module'
import * as _ from 'lodash'
import {getViewPort$dom} from '../../object-store/view-port'
import './index.scss'

@connect(
    (state: any) => {
        return {
            outerMoveBox: state.outerMoveBox.toJS()
        }
    },
    {}
)
export default class OuterMoveBox extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    shouldComponentUpdate(nextProps: any) {
        if (_.isEqual(this.props['outerMoveBox'], nextProps['outerMoveBox'])) {
            return false
        }
        return true
    }

    render() {
        if (!this.props.outerMoveBox.show)return null

        const $viewPort = getViewPort$dom()

        const style = {
            left: this.props.outerMoveBox.left - $viewPort.offset().left,
            top: this.props.outerMoveBox.top - $viewPort.offset().top - 2,
            width: this.props.outerMoveBox.width,
            height: this.props.outerMoveBox.height,
        }

        return (
            <div className="_namespace"
                 style={style}></div>
        )
    }
}