import * as React from 'react'
import * as module from './module'
import {others} from '../../../../../common/transmit-transparently/src'

export default class ParagraphComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        const style = {
            fontSize: this.props.options['fontSize'].value
        }

        const otherProps = others(new module.Props(), this.props)

        return (
            <span {...otherProps} style={style}>{this.props.options['text'].value}</span>
        )
    }
}