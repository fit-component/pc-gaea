import * as React from 'react'
import connect from '../../utils/connect'
import * as module from './module.tsx'
import Modal from '../../../../../modal/src'
import Switch from '../../../../../switch/src'
import {MenuItem} from '../../../../../menu/src'
import * as actions from '../../stores/actions'
import * as _ from 'lodash'
import './index.scss'

@connect(
    (state: any) => {
        return {
            userSetting: state.userSetting.toJS()
        }
    },
    actions
)
export default class UserSetting extends React.Component <module.PropsInterface, module.StateInterface> {
    state = {
        show: false
    }

    context: module.IRouterContext & module.ISomeOtherContext
    static contextTypes = {
        pluginInfo: React.PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (_.isEqual(this.props['userSetting'], nextProps['userSetting']) && _.isEqual(this.state, nextState)) {
            return false
        }
        return true
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

    handleExtendChange (key:string, value:any) {
        this.props.handleConfigChange(key, value);
    }

    handleSettingChange(key: string, value: any) {
        this.props['userSettingUpdate'](key, value)
    }

    render() {
        let ExtendComponent:JSX.Element;
        if (this.context.pluginInfo.extendConfig) {
            let extendConfig = this.context.pluginInfo.extendConfig;
            ExtendComponent = React.createElement(extendConfig.component, {
                onChange: this.handleExtendChange.bind(this)
            })
        }

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
                        {ExtendComponent}
                    </Modal>
                </div>
            </MenuItem>
        )
    }
}