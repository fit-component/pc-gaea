import * as React from 'react'
import Modal from '../../../../../../../modal/src'
import Button from '../../../../../../../button/src'
import connect from '../../../../utils/connect'
import * as _ from 'lodash'

@connect(
    (state: any) => {
        return {
            userSetting: state.userSetting.toJS()
        }
    },
    {}
)
export default class RemoveButton extends React.Component <any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            show: false
        }
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (_.isEqual(this.props['userSetting'], nextProps['userSetting']) && this.state.show === nextState.show) {
            return false
        }
        return true
    }

    handleShowModalOrClick() {
        if (!this.props['userSetting'].confirmOnRemove) {
            // 如果配置直接移除,则直接调用父级方法
            this.props['onClick']()
        } else {
            // 否则显示确认框
            this.setState({
                show: true
            })
        }
    }

    handleOk() {
        this.setState({
            show: false
        }, ()=> {
            this.props['onClick']()
        })
    }

    handleCancel() {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <Button type="secondary"
                    onClick={this.handleShowModalOrClick.bind(this)}>
                移除
                <Modal show={this.state.show}
                       onOk={this.handleOk.bind(this)}
                       onCancel={this.handleCancel.bind(this)}>
                    <p>是否要移除此组件?</p>
                </Modal>
            </Button>
        )
    }
}