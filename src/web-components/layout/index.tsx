import * as React from 'react'
import * as module from './module'
import {others} from '../../../../../common/transmit-transparently/src'

export default class LayoutComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        let style: any = {
            width: this.props.options['width'].value,
            minHeight: this.props.options['minHeight'].value,
            background: this.props.options['background'].value,
            display: this.props.options['display'].value,
            flexDirection: this.props.options['flexDirection'].value,
            flexGrow: this.props.options['flexGrow'].value,
            flexWrap: this.props.options['flexWrap'].value,
            justifyContent: this.props.options['justifyContent'].value,
            alignItems: this.props.options['alignItems'].value,
            overflow: this.props.options['overflow'].value
        }

        const otherProps = others(new module.Props(), this.props)

        return (
            <div {...otherProps} style={style}>{this.props.children}</div>
        )
    }
}