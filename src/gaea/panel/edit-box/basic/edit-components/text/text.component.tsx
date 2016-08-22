import * as React from 'react'
import * as typings from './text.type'
import {observer, inject} from 'mobx-react'

import Input from '../../../../../../../../input/src'

@inject('viewport') @observer
export default class EditComponentText extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
        const textOpts = {
            label: this.componentInfo.props.options[this.props.optionKey].label,
            disabled: !this.componentInfo.props.options[this.props.optionKey].editable,
            value: this.componentInfo.props.options[this.props.optionKey].value as string,
            onChange: (event: any)=> {
                if (typeof this.componentInfo.props.options[this.props.optionKey].value === 'number') {
                    this.props.viewport.updateComponentOptionsValue(this.props.optionKey, Number(event.target.value))
                } else {
                    this.props.viewport.updateComponentOptionsValue(this.props.optionKey, event.target.value)
                }
            }
        }
        return (
            <Input {...textOpts}/>
        )
    }
}