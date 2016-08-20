import * as React from 'react'
import * as typings from './online.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from '../../../../../../../common/auto-bind/src'
import {MenuItem} from '../../../../../../menu/src'

@observer
export default class Online extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        return (
            <MenuItem>上线</MenuItem>
        )
    }
}