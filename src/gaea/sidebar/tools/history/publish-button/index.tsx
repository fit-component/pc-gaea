import * as React from 'react'
import Modal from '../../../../../../../modal/src'
import Button from '../../../../../../../button/src'
import {Select} from '../../../../../../../select/src'
import {Input} from '../../../../../../../input/src'
import {
    getNewestVersion,
    setNewestVersion,
    getRootProps,
    changeVersionStatu
} from '../../../../object-store/root-props'
import {getGaea} from '../../../../object-store/gaea'
import './index.scss'

export default class Online extends React.Component <any ,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            show: false,

            /**
             * 已选择的版本号
             */
            selectedVersion: '',

            selectOptions: {
                label: '选择要发布的版本号'
            },

            /**
             * 备注
             */
            remarks: ''
        }
    }

    handleShowModal() {
        const newestVersion = getNewestVersion()
        const versionSplit = newestVersion.split('.')
        const major = parseInt(versionSplit[0])
        const minor = parseInt(versionSplit[1])
        const patch = parseInt(versionSplit[2])

        const majorVersion = `${major + 1}.0.0`
        const minorVersion = `${major}.${minor + 1}.0`
        const patchVersion = `${major}.${minor}.${patch + 1}`

        this.setState({
            show: true,
            selectOptions: Object.assign({}, this.state.selectOptions, {
                value: '',
                options: [{
                    key: patchVersion,
                    value: '补丁 ' + patchVersion
                }, {
                    key: minorVersion,
                    value: '次要 ' + minorVersion
                }, {
                    key: majorVersion,
                    value: '重要 ' + majorVersion
                }]
            })
        })
    }

    handleOk() {
        if (this.state.selectedVersion === '')return

        const selectedVersion = this.state.selectedVersion

        this.setState({
            show: false
        }, ()=> {
            const gaea = getGaea()
            gaea.props.onPublish(this.props['id'], selectedVersion, this.state.remarks, ()=> {
                // 用户确认服务器保存成功了,更新版本号
                this.setState({
                    selectedVersion: ''
                })

                // 更新本地保存的版本号
                setNewestVersion(selectedVersion)

                // 修改 versions 状态
                changeVersionStatu(this.props['id'], selectedVersion, this.state.remarks)
            })
        })
    }

    handleCancel() {
        this.setState({
            show: false
        })
    }

    /**
     * 选择了一个版本号
     */
    handleSelectChange(value: string) {
        this.setState({
            selectedVersion: value,
            selectOptions: Object.assign({}, this.state.selectOptions, {
                value: value
            })
        })
    }

    /**
     * 修改了备注
     */
    handleRemarksChange(value: any) {
        this.setState({
            remarks: value.target.value
        })
    }

    render() {
        return (
            <Button size="sm"
                    type="info"
                    onClick={this.handleShowModal.bind(this)}>
                发布
                <div className="_namespace">
                    <Modal className="_namespace"
                           show={this.state.show}
                           onOk={this.handleOk.bind(this)}
                           onCancel={this.handleCancel.bind(this)}>
                        <div className="title">发布</div>
                        <Select onChange={this.handleSelectChange.bind(this)} {...this.state.selectOptions}/>
                        <Input label="请填写备注"
                               onChange={this.handleRemarksChange.bind(this)}/>
                    </Modal>
                </div>
            </Button>
        )
    }
}