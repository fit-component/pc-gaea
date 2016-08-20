import * as React from 'react'
import Input from '../../../../input/src'
import * as module from './module'
import {others} from '../../../../../common/transmit-transparently/src'

export default class InputComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        const otherProps = others(new module.Props(), this.props)
        return (
            <Input {...otherProps} label={this.props.options['label'].value}/>
        )
    }
}