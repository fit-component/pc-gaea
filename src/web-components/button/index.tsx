import * as React from 'react'
import Button from '../../../../button/src'
import * as module from './module'
import {others} from '../../../../../common/transmit-transparently/src'

export default class ButtonComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        const otherProps = others(new module.Props(), this.props)
        return (
            <Button {...otherProps}>{this.props.options['text'].value}</Button>
        )
    }
}