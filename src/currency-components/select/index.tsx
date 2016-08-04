import * as React from 'react'
import {Select} from '../../../../select/src'
import * as module from './module'

export default class InputComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        console.log('select render', this.props.options['options'].value)
        return (
            <Select label={this.props.options['label'].value}
                    options={this.props.options['options'].value}
                    defaultValue={this.props.options['defaultValue'].value}/>
        )
    }
}