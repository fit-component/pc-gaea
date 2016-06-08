import * as React from 'react'
import connect from '../../../utils/connect'
import * as module from './module'
import {get$domTree} from '../../../object-store/dom-tree'
import * as _ from 'lodash'
import './index.scss'

@connect(
    (state: any) => {
        return {
            treeMoveBox: state.treeMoveBox.toJS(),
            section: state.section.toJS()
        }
    },
    {}
)
export default class Sidebar extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    shouldComponentUpdate(nextProps: any) {
        if (_.isEqual(this.props['treeMoveBox'], nextProps['treeMoveBox']) && _.isEqual(this.props['section'], nextProps['section'])) {
            return false
        }
        return true
    }

    render() {
        if (!this.props.treeMoveBox.show)return null

        // 获取 $domTree 的滚动值
        const $domTree = get$domTree()

        const style = {
            left: this.props.treeMoveBox.left,
            top: this.props.treeMoveBox.top + $domTree.scrollTop(),
            width: this.props.treeMoveBox.width,
            height: this.props.treeMoveBox.height,
        }

        return (
            <div className="_namespace"
                 style={style}></div>
        )
    }
}