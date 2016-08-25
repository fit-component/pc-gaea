import * as React from 'react'
import {Select} from '../../../../select/src'
import * as module from './module'
import {others} from '../../../../../common/transmit-transparently/src'

export default class InputComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        // 重新组成符合 select 结构的 options
        let selectOptions: any
        (this.props.options['options'].array as Array<FitGaea.ComponentPropsOptionsArrayValue>).forEach(item=> {
            selectOptions[item.key] = item.value
        })

        const otherProps = others(new module.Props(), this.props)

        return (
            <Select {...otherProps}
                label={this.props.options['label'].value}
                options={this.props.options['options'].value}
                defaultValue={this.props.options['defaultValue'].value}/>
        )
    }
}