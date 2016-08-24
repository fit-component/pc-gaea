import * as React from 'react'
import * as module from './module'
import {others} from '../../../../../common/transmit-transparently/src'
const {View} = require('react-native')

export default class LayoutComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        let style: any = {
            width: this.props.options['width'].value,
            minHeight: this.props.options['minHeight'].value,
            backgroundColor: this.props.options['backgroundColor'].value,
            flexDirection: this.props.options['flexDirection'].value,
            flexGrow: this.props.options['flexGrow'].value,
            flexWrap: this.props.options['flexWrap'].value,
            justifyContent: this.props.options['justifyContent'].value,
            alignItems: this.props.options['alignItems'].value,
            overflow: this.props.options['overflow'].value
        }

        return (
            <View style={style}>{this.props.children}</View>
        )
    }
}