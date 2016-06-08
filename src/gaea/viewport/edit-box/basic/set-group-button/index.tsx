import * as React from 'react'
import Modal from '../../../../../../../modal/src'
import Button from '../../../../../../../button/src'
import Input from '../../../../../../../input/src'
import './index.scss'

export default class SetGroupButton extends React.Component <any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            show: false,
            name: ''
        }
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (this.state.show === nextState.show) {
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
        }, ()=> {
            this.props['onOk'](this.state.name)
        })
    }

    handleCancel() {
        this.setState({
            show: false
        })
    }

    handleChangeName(event: any) {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        return (
            <Button onClick={this.handleShowModal.bind(this)}>
                设为组合
                <Modal className="_namespace"
                       show={this.state.show}
                       onOk={this.handleOk.bind(this)}
                       onCancel={this.handleCancel.bind(this)}>
                    <Input onChange={this.handleChangeName.bind(this)}
                           label="请输入组名"/>
                    <p className="description">设为组合的元素,会在右侧『组件』栏中『组合』选项中出现.</p>
                </Modal>
            </Button>
        )
    }
}