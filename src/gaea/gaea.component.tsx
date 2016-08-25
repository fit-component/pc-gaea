/// <reference path="../../../../../typings-module/sortablejs.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './gaea.type'
import {observer, Provider} from 'mobx-react'

import {autoBindMethod} from '../../../../common/auto-bind/src'

import ApplicationStore from './store/application'
import ViewportStore from './store/viewport'
import Setting from './store/setting'

import Page from './page/page.component'

//import DevTools from 'mobx-react-devtools'

//import 'animate.css'

@observer
export default class Gaea extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    private applicationStore = new ApplicationStore()
    private viewport = new ViewportStore(this.applicationStore)
    private setting = new Setting()

    componentWillMount() {
        // 将初始化的 props 赋值到 store 上
        this.setPropsToApplication.call(this, this.props)
    }

    componentWillReceiveProps(nextProps: typings.PropsDefine) {
        // TODO 别每次都更新啊,要 shadowEqual 判断下是否相等
        // 再覆盖初始化数据
        this.setPropsToApplication.call(this, nextProps)
        // 因为初始化数据不会自动更新,所以要 forceUpdate 一下
        this.forceUpdate()
    }

    /**
     * 将 props 赋值到 store 中
     */
    setPropsToApplication(props: typings.PropsDefine) {
        this.applicationStore.setInitPropsToApplication({
            title: props.title,
            baseComponents: this.props.baseComponents,
            customComponents: props.customComponents,
            isHideCustomComponents: props.isHideCustomComponents,
            // 页面编辑信息
            defaultValue: props.defaultValue
        })
    }

    /**
     * 获取根节点 ref
     */
    getRootRef(ref: React.ReactInstance) {
        this.viewport.setRootDomInstance(ReactDOM.findDOMNode(ref))
    }

    render() {
        return (
            <Provider application={this.applicationStore}
                      viewport={this.viewport}
                      setting={this.setting}>
                <div ref={this.getRootRef.bind(this)}>
                    <Page/>
                </div>
            </Provider>
        )
    }
}

// <DevTools position={{bottom:0,left:0}}/>

