import * as React from 'react'
import * as module from './module'
import * as _ from 'lodash'
import Input from '../../../../../../input/src'
import {Select} from '../../../../../../select/src'
import {Button, ButtonGroup} from '../../../../../../button/src'
import {addGroupComponent} from '../../../object-store/group-components'
import {getCurrentSelectedHelperInstance} from '../../../object-store/current-selection'
import {getRootProps, saveToHistory} from '../../../object-store/root-props'
import './index.scss'

import RemoveButton from './remote-button'
import SetGroupButton from './set-group-button'

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
    handleOptionsChange(key: string, isEvent: boolean, special: any, value: any) {
        if (isEvent) {
            this.doChange(key, value.target.value, special)
        } else {
            this.doChange(key, value, special)
        }
    }

    doChange(key: string, value: any, special: any) {
        // 通知 helper 更新组件信息
        const currentSelectedHelperInstance: any = getCurrentSelectedHelperInstance()
        currentSelectedHelperInstance.doUpdatePropsOptions(key, value, special)

        this.props.onChange()
    }

    /**
     * 重置组件 options
     */
    resetOptions() {
        // 通知 helper 更新组件信息
        const currentSelectedHelperInstance: any = getCurrentSelectedHelperInstance()
        currentSelectedHelperInstance.resetOptions()

        this.props.onChange()
    }

    /**
     * 修改组件名
     */
    handleChangeName(event: any) {
        // 通知 helper 更新组件信息
        const currentSelectedHelperInstance: any = getCurrentSelectedHelperInstance()
        currentSelectedHelperInstance.doUpdatePropsName(event.target.value)

        this.props.onChange()
    }

    /**
     * 删除当前组件
     */
    handleRemoveCurrent() {
        // 通知这个组件自我删除（这个组件会通知父级让其删除它）
        const currentSelectedHelperInstance: any = getCurrentSelectedHelperInstance()
        currentSelectedHelperInstance.doRemoveSelf(true)
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

    /**
     * 成组
     */
    handleSetGroup(name: string) {
        const rootPropsImmutable = getRootProps()
        // 从 rootProps 里查询组件准确信息
        const info = rootPropsImmutable.getIn(this.props.positions).toJS()
        addGroupComponent({
            name,
            info
        })
    }

    /**
     * 根据类型生成对应编辑器的dom结构
     */
    createEditDom(editItem: any, key: string, special: any): React.ReactElement<any> {
        // 生成每一个 key 都要带 uniqueKey,防止组件不刷新
        switch (editItem.editor) {
            case 'text':
                // 文本编辑器
                const textOpts: any = {
                    key: _.uniqueId(this.state.mergedProps.uniqueKey),
                    label: editItem.label,
                    disabled: !editItem.editable,
                    defaultValue: editItem.value,
                    onChange: this.handleOptionsChange.bind(this, key, true, special)
                }
                return (
                    <Input {...textOpts}/>
                )
            case 'selector':
                // 下拉选择
                const selectorOpts: any = {
                    key: _.uniqueId(this.state.mergedProps.uniqueKey),
                    label: editItem.label,
                    disabled: !editItem.editable,
                    defaultValue: editItem.value,
                    options: editItem.options,
                    onChange: this.handleOptionsChange.bind(this, key, false, special)
                }
                return (
                    <Select {...selectorOpts} />
                )

            case 'object':
                let ObjectChildren = Object.keys(editItem.children).map((formKey: string) => {
                    const formItemInfo = editItem.children[formKey];
                    formItemInfo.value = editItem.value[formKey];
                    return this.createEditDom(formItemInfo, key, {
                        type: 'default'
                    });
                });

                return (
                    <div key={_.uniqueId(this.state.mergedProps.uniqueKey)}>
                        {ObjectChildren}
                    </div>
                )

            case 'array':
                // 数组
                // 循环 value 数组
                const ArrayChildren = editItem.value.map((item: any, index: number)=> {
                    // 循环 children 对象,对每个 value 数组生成表单
                    const ArrayFormChildren = Object.keys(editItem.children).map((formKey: string, formIndex: number)=> {
                        const formItemInfo = editItem.children[formKey]
                        // 将 value 赋值给对应的 form
                        formItemInfo.value = item[formKey]
                        return this.createEditDom(formItemInfo, key, {
                            type: 'arrayUpdate',
                            index,
                            key: formKey
                        })
                    })

                    // 如果不是第一个,在顶部加分隔条
                    let SplitElement: React.ReactElement<any> = null
                    if (index > 0) {
                        SplitElement = <div className="split"/>
                    }
                    const deleteSpecial = {
                        type: 'arrayDelete',
                        index
                    }

                    return (
                        <div key={_.uniqueId(this.state.mergedProps.uniqueKey)}
                             className="group-item-container">
                            <i className="fa fa-times close"
                               onClick={this.handleOptionsChange.bind(this, key, false, deleteSpecial)}/>
                            {SplitElement}
                            <div className="group-item">
                                {ArrayFormChildren}
                            </div>
                        </div>
                    )
                })

                return (
                    <div className="array-group-container"
                         key={_.uniqueId(this.state.mergedProps.uniqueKey)}>
                        <div className="array-group-title">{editItem.label}</div>
                        <div className="array-group-content">
                            {ArrayChildren}
                            {!editItem.freeze && <Button className="add"
                                                         onClick={this.handleOptionsChange.bind(this, key, false, {type:'arrayPush'})}>新增一项</Button> }
                        </div>
                    </div>
                )
        }
    }

    render() {
        // 把对象转成数组
        let optionsArray: Array<string> = []
        Object.keys(this.state.mergedProps.options).forEach((key, index)=> {
            let obj: any = this.state.mergedProps.options[key]
            obj._key = key
            optionsArray.push(obj)
        })
        // 把配置数组根据 order 排序
        optionsArray = _.sortBy(optionsArray, 'order')
        const Editors = optionsArray.map((item: any, index: number)=> {
            return this.createEditDom(item, item._key, {type: 'default'})
        })

        /**
         * 重置按钮,非根节点才有
         */
        let ResetButton: React.ReactElement<any> = null
        if (!this.props.isRoot) {
            ResetButton = (
                <Button onClick={this.resetOptions.bind(this)}>重置为默认属性</Button>
            )
        }

        /**
         * 成组按钮,有childs的layout元素且非根节点才有
         */
        let GroupButton: React.ReactElement<any> = null
        if (this.props.mergedProps.uniqueKey === 'gaea-layout' && !this.props.isRoot) {
            GroupButton = (
                <SetGroupButton onOk={this.handleSetGroup.bind(this)}/>
            )
        }

        return (
            <div className="_namespace">
                <div className="component-icon-container">
                    <i className={`fa fa-${this.state.mergedProps.icon}`}/>
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
                    <ButtonGroup>
                        {ResetButton}
                        {GroupButton}
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}