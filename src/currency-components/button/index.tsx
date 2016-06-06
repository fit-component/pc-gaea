import * as React from 'react'
import Button from '../../../../button/src'
import * as module from './module'

export default class ButtonComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        return (
            <Button>{this.props.options['text'].value}</Button>
        )
    }
}