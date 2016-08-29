import * as React from 'react'
import * as typings from './switch.type'
import {observer, inject} from 'mobx-react'
import './switch.scss'

import Switch from '../../../../../../../../switch/src'

@inject('viewport') @observer
export default class EditComponentSwitch extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
        const switchOpts = {
            disabled: !this.props.editOption.editable,
            checked: this.componentInfo.props[this.props.editOption.field] as boolean,
            onChange: (checked: boolean)=> {
                this.props.viewport.updateComponentOptionsValue(this.props.editOption, checked)
            }
        }
        return (
            <div className="_namespace">
                <span>{this.props.editOption.label}</span>
                <Switch {...switchOpts}/>
            </div>
        )
    }
}