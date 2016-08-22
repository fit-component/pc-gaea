import * as React from 'react'
import * as typings from './select.type'
import {observer, inject} from 'mobx-react'

import {Select} from '../../../../../../../../select/src'

@inject('viewport') @observer
export default class EditComponentSelect extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo:FitGaea.ViewportComponentInfo

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
        const selectorOpts = {
            label: this.componentInfo.props.options[this.props.optionKey].label,
            disabled: !this.componentInfo.props.options[this.props.optionKey].editable,
            defaultValue: this.componentInfo.props.options[this.props.optionKey].value as string,
            options: this.componentInfo.props.options[this.props.optionKey].selector,
            onChange: (value: string)=> {
                this.props.viewport.updateComponentOptionsValue(this.props.optionKey, value)
            }
        }
        return (
            <Select {...selectorOpts} />
        )
    }
}