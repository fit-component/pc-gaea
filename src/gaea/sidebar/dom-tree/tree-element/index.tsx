import * as React from 'react'
import * as module from './module'
import {Tree, TreeNode} from '../../../../../../tree/src'

export default class TreeElement extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        return (
            <div>123</div>
        )
    }
}