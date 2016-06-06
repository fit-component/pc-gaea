import * as React from 'react'
import connect from '../../utils/connect'
import Button from '../../../../../button/src'
import Modal from '../../../../../modal/src'
import Switch from '../../../../../switch/src'
import {MenuItem} from '../../../../../menu/src'
import * as actions from '../../stores/actions'
import './index.scss'

@connect(
    (state: any) => {
        return {
            userSetting: state.userSetting.toJS()
        }
    },
    actions
)
export default class Header extends React.Component <any ,any> {
    state = {
        show: false
    }

    handleShowModal() {
        this.setState({
            show: true
        })
    }

    handleOk() {
        this.setState({
            show: false
        })
    }

    handleCancel() {
        this.setState({
            show: false
        })
    }

    handleSettingChange(key: string, value: any) {
        this.props['userSettingUpdate'](key, value)
    }

    render() {
        return (
            <MenuItem onClick={this.handleShowModal.bind(this)}>
                设置
                <div className="_namespace">
                    <Modal className="_namespace"
                           show={this.state.show}
                           onOk={this.handleOk.bind(this)}
                           onCancel={this.handleCancel.bind(this)}>
                        <div className="title">编辑器</div>
                        <div className="left-right">
                            <div className="left">点击移除时会弹出确认框</div>
                            <div className="right">
                                <Switch checked={this.props['userSetting'].confirmOnRemove}
                                        onChange={this.handleSettingChange.bind(this,'confirmOnRemove')}/>
                            </div>
                        </div>
                    </Modal>
                </div>
            </MenuItem>
        )
    }
}