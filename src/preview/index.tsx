import * as React from 'react'
import * as module from './module'
import currencyComponents from '../currency-components'
import {setComponents} from './object-store/components'
import Helper from './helper'
import './index.scss'

export default class Preview extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    componentWillMount() {
        // 把通用组件装进来
        // 初始状态先获取所有组件的引用
        let components: any = {}

        currencyComponents.map(item=> {
            components[item.defaultProps.uniqueKey] = item
        })

        this.props.components && this.props.components.map((item: any)=> {
            components[item.defaultProps.uniqueKey] = item
        })

        setComponents(components)
    }

    /**
     * 通过 id 寻找组件
     */
    getComponentById() {

    }

    render() {
        return (
            <div className="_namespace">
                <Helper componentInfo={this.props.componentInfo}/>
            </div>
        )
    }
}