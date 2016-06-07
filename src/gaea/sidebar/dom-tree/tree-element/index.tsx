import * as React from 'react'
import * as module from './module'
import {TreeNode} from '../../../../../../tree/src'
import {getComponents} from '../../../object-store/components'
import './index.scss'

export default class TreeElement extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    // 获取展示信息
    getName() {
        // 获取组件默认的名字，优先读配置
        const components = getComponents()
        let name: string = components[this.props.info.component].defaultProps.name
        let icon: string = components[this.props.info.component].defaultProps.icon || 'cube'
        if (this.props.info.props && this.props.info.props && this.props.info.props.name) {
            name = this.props.info.props.name
        }

        // 如果 uniqueKey 中有 gaea,说明是内置组件,用背景加深方式展现
        if (this.props.info.component.indexOf('gaea') > -1) {
            return (
                <div className="flex">
                    <i className={`fa fa-${icon} icons gaea`}/>
                    <span className="text">{name}</span>
                </div>
            )
        } else {
            return (
                <div className="flex">
                    <i className={`fa fa-${icon} icons`}/>
                    <span className="text">{name}</span>
                </div>
            )
        }
    }

    render() {
        let children: React.ReactElement<any> = null

        if (this.props.info.childs) {
            let childElements: React.ReactElement<any> = this.props.info.childs.map((item: any, index: number)=> {
                let props = {
                    key: index,
                    info: item,
                    defaultExpendAll: this.props.defaultExpendAll
                }
                return React.createElement(TreeElement, props)
            })

            children = React.createElement(TreeNode, {
                className: '_namespace',
                render: this.getName.bind(this),
                defaultExpendAll: this.props.defaultExpendAll
            }, childElements)
        } else {
            children = React.createElement(TreeNode, {
                className: '_namespace',
                render: this.getName.bind(this),
                defaultExpendAll: this.props.defaultExpendAll
            })
        }

        return children
    }
}