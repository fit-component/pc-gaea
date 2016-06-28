import * as React from 'react'
import {ContextMenu, MenuItem, SubMenu} from 'react-contextmenu'
import * as module from './module'
import Modal from '../../../../../../../modal/src'
import Input from '../../../../../../../input/src'
import {getRootProps} from '../../../../object-store/root-props'
import {getGaea} from '../../../../object-store/gaea'
import './index.scss'

export default class ContextMenuComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    /**
     * 新增脚本 modal
     */
    handleShowModalAddScript() {
        this.setState({
            showAddScript: true
        })
    }

    handleOkAddScript() {
        // 触发添加文件事件
        const gaea = getGaea()
        gaea.props.addSourceFile(this.props.path[this.props.path.length - 1], {
            type: 'script',
            name: this.state.addScriptLabelValue,
            order: 1
        }, ()=> {
            // 确认添加成功
            this.setState({
                showAddScript: false
            })
        })
    }

    handleCancelAddScript() {
        this.setState({
            showAddScript: false
        })
    }

    handleAddScriptNameChange(event: any) {
        this.setState({
            addScriptLabelValue: event.target.value
        })
    }

    render() {
        return (
            <div>
                <ContextMenu className="_namespace"
                             identifier="sourceContainer">
                    <SubMenu title="当前目录新增">
                        <MenuItem onClick={this.handleShowModalAddScript.bind(this)}>
                            <i className="fa fa-file-code-o icon"/> 脚本
                        </MenuItem>
                    </SubMenu>
                </ContextMenu>

                <Modal show={this.state.showAddScript}
                       onOk={this.handleOkAddScript.bind(this)}
                       onCancel={this.handleCancelAddScript.bind(this)}>
                    <Input onChange={this.handleAddScriptNameChange.bind(this)}
                           label="请输入文件名"/>
                </Modal>
            </div>
        )
    }
}