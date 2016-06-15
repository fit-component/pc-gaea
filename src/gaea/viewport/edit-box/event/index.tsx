import * as React from 'react'
import * as module from './module'
import * as _ from 'lodash'
import {Select, Option} from '../../../../../../select/src'
import './index.scss'

export default class Event extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        return (
            <div className="_namespace">
                <Select label="请选择事件">
                    <Option value="none">无</Option>
                    <Option value="click">点击</Option>
                </Select>
            </div>
        )
    }
}