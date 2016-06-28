import * as React from 'react'
import Modal from '../../../../../modal/src'
import {MenuItem} from '../../../../../menu/src'
import {Select} from '../../../../../select/src'
import {getRootProps} from '../../object-store/root-props'
import {getGaea} from '../../object-store/gaea'
import {OnlineVersion} from '../../module'
import './index.scss'

export default class Online extends React.Component <any ,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            show: false,
            selectOptions: {
                label: '请选择一个已发布的版本号'
            },
            selectedKey: ''
        }
    }

    handleShowModal() {
        const gaea = getGaea()
        gaea.props.onOnlineModalShow((lists: Array<OnlineVersion>)=> {
            this.setState({
                show: true,
                selectOptions: Object.assign({}, this.state.selectOptions, {
                    defaultValue: this.state.selectedKey,
                    options: lists
                })
            })
        })
    }

    handleOk() {
        // 如果没有选择,点确认没效果
        if (this.state.selectedKey === '')return

        this.setState({
            show: false
        }, ()=> {
            const gaea = getGaea()
            gaea.props.onOnlineClick(this.state.selectedKey)
        })
    }

    handleCancel() {
        this.setState({
            show: false
        })
    }

    /**
     * 选择了一个版本
     */
    handleSelectChange(value: string|number) {
        this.setState({
            selectedKey: value
        })
    }

    render() {
        return (
            <MenuItem onClick={this.handleShowModal.bind(this)}>
                上线
                <div className="_namespace">
                    <Modal className="_namespace"
                           show={this.state.show}
                           onOk={this.handleOk.bind(this)}
                           onCancel={this.handleCancel.bind(this)}>
                        <div className="title">选择上线单号</div>
                        <Select onChange={this.handleSelectChange.bind(this)} {...this.state.selectOptions}/>
                    </Modal>
                </div>
            </MenuItem>
        )
    }
}