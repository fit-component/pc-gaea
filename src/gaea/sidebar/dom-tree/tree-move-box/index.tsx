import * as React from 'react'
import connect from '../../../utils/connect'
import * as module from './module'
import * as _ from 'lodash'
import './index.scss'

@connect(
    (state: any) => {
        return {
            treeMoveBox: state.treeMoveBox.toJS()
        }
    },
    {}
)
export default class TreeMoveBox extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    shouldComponentUpdate(nextProps: any) {
        if (_.isEqual(this.props['treeMoveBox'], nextProps['treeMoveBox'])) {
            return false
        }
        return true
    }

    render() {
        if (!this.props.treeMoveBox.show)return null

        const style = {
            left: this.props.treeMoveBox.left,
            top: this.props.treeMoveBox.top,
            width: this.props.treeMoveBox.width,
            height: this.props.treeMoveBox.height,
        }

        return (
            <div className="_namespace"
                 style={style}></div>
        )
    }
}