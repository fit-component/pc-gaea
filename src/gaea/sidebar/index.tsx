import * as React from 'react'
import Tools from './tools'
import DomTree from './dom-tree'
import * as classNames from 'classnames'
import connect from '../utils/connect'
import * as module from './module'
import './index.scss'

@connect(
    (state: any) => {
        return {
            preview: state.preview.toJS()
        }
    },
    {}
)
export default class Sidebar extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    shouldComponentUpdate(nextProps: module.PropsInterface) {
        if (nextProps.preview.isPreview === this.props.preview.isPreview) {
            return false
        }
        return true
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            'preview': this.props.preview.isPreview === true
        })

        return (
            <div className={classes}>
                <Tools/>
                <DomTree/>
            </div>
        )
    }
}