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
            label: this.props.editOption.label,
            disabled: !this.props.editOption.editable,
            value: this.componentInfo.props[this.props.editOption.field] as string,
            onChange: (event: any)=> {
                if (typeof this.componentInfo.props[this.props.editOption.field] === 'number') {
                    this.props.viewport.updateComponentOptionsValue(this.props.editOption, Number(event.target.value))
                } else {
                    this.props.viewport.updateComponentOptionsValue(this.props.editOption, event.target.value)
                }
            }
        }
        return (
            <Input {...textOpts}/>
        )
    }
}