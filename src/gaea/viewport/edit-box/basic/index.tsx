import * as React from 'react'
import * as module from './module'
import * as _ from 'lodash'
import Input from '../../../../../../input/src'
import Button from '../../../../../../button/src'
import {
    setCurrentSelectedDragSourceInstance,
    setCurrentSelectedHelperInstance,
    getCurrentSelectedDragSourceInstance,
    getCurrentSelectedHelperInstance
} from '../../../object-store/current-selection'
import './index.scss'

import RemoveButton from './remote-button'

export default class Basic extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    componentWillMount() {
        this.setState({
            mergedProps: _.cloneDeep(this.props.mergedProps)
        })
    }

    componentWillReceiveProps(nextProps: module.PropsInterface) {
        this.setState({
            mergedProps: _.cloneDeep(nextProps.mergedProps)
        })
    }

    shouldComponentUpdate(nextProps: any) {
        return this.props.mergedProps !== nextProps.mergedProps
    }

    /**
     * 修改组件 options
     */
    handleOptionsChange(key: string, value: any) {
        this.doChange(key, value)
    }

    handleOptionsChangeEvent(key: string, event: any) {
        this.doChange(key, event.target.value)
    }

    doChange(key: string, value: any) {
        // 通知 helper 更新组件信息
        const currentSelectedHelperInstance: any = getCurrentSelectedHelperInstance()
        currentSelectedHelperInstance.doUpdatePropsOptions(key, value)
    }

    /**
     * 重置组件 options
     */
    resetOptions() {
        // 通知 helper 更新组件信息
        const currentSelectedHelperInstance: any = getCurrentSelectedHelperInstance()
        currentSelectedHelperInstance.resetOptions()
    }

    /**
     * 修改组件名
     */
    handleChangeName(event: any) {
        // 通知 helper 更新组件信息
        const currentSelectedHelperInstance: any = getCurrentSelectedHelperInstance()
        currentSelectedHelperInstance.doUpdatePropsName(event.target.value)
    }

    /**
     * 删除当前组件
     */
    handleRemoveCurrent() {
        // 通知这个组件自我删除（这个组件会通知父级让其删除它）
        const currentSelectedHelperInstance: any = getCurrentSelectedHelperInstance()
        currentSelectedHelperInstance.doRemoveSelf()
    }

    /**
     * 给标题输入框右侧增加删除按钮
     */
    titleInputRightRender() {
        // 根组件没有移除功能
        if (this.props.isRoot)return null

        return (
            <RemoveButton onClick={this.handleRemoveCurrent.bind(this)}/>
        )
    }

    render() {
        const Editors = Object.keys(this.state.mergedProps.options).map((key, index)=> {
            const editItem: any = this.state.mergedProps.options[key]

            // 生成每一个 key 都要带 uniqueKey,防止组件不刷新
            switch (editItem.editor) {
                case 'text':
                    // 文本编辑器
                    return (
                        <Input key={_.uniqueId(this.state.mergedProps.uniqueKey)}
                               label={editItem.label}
                               disabled={!editItem.editable}
                               onChange={this.handleOptionsChangeEvent.bind(this,key)}
                               defaultValue={editItem.value}/>
                    )

            }
        })

        return (
            <div className="_namespace">
                <div className="component-icon-container">
                    <i className={`fa fa-${this.state.mergedProps.icon}`}></i>
                </div>
                <Input className="title-name"
                       label=""
                       key={_.uniqueId('title-name')}
                       onChange={this.handleChangeName.bind(this)}
                       rightRender={this.titleInputRightRender.bind(this)}
                       style={{paddingLeft:35}}
                       defaultValue={this.state.mergedProps.name}/>
                <div className="edit-item-container">
                    {Editors}
                </div>
                <div className="bottom-addon">
                    {!this.props.isRoot?
                    <Button onClick={this.resetOptions.bind(this)}>重置为默认属性</Button>:null}
                </div>
            </div>
        )
    }
}