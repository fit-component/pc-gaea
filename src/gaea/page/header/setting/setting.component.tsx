import * as React from 'react'
import * as typings from './setting.type'
import {observer, inject} from 'mobx-react'

import {MenuItem} from '../../../../../../menu/src'

import {autoBindMethod} from '../../../../../../../common/auto-bind/src'

@observer
export default class Setting extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        return (
            <MenuItem>设置</MenuItem>
        )
    }
}