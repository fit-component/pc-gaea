import * as React from 'react'
import Input from '../../../../input/src'
import * as module from './module'

export default class InputComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        return (
            <Input label={this.props.options['label'].value}/>
        )
    }
}