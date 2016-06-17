/// <reference path="../../../../../../../../typings-module/react-codemirror.d.ts" />

import * as React from 'react'
import * as module from './module'
import * as Codemirror from 'react-codemirror'
import * as process from 'process'
import * as _ from 'lodash'
import './index.scss'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

const defaultValue = _.trim(`
/**
 * 初始化函数,在组件创建时系统自动调用
 */
function componentWillMount() {

}

/**
 * 初始化函数,在组件 DOM 节点创建后系统自动调用
 */
function componentDidMount() {

}

/**
 * 析构函数,在组件销毁时系统自动调用
 */
function componentWillUnmount() {

}
`)

const codeMirrorOpts = {
    lineNumbers: true,
    readOnly: false,
    mode: 'javascript',
    theme: 'default',
    tabSize: 2
}

export default class Event extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    /**
     * 编辑代码
     */
    handleCodeChange() {

    }

    render() {
        // 只会在前端显示
        if (!process.browser)return null

        return (
            <div className="_namespace">
                <Codemirror onChange={this.handleCodeChange.bind(this)}
                            defaultValue={defaultValue}
                            options={codeMirrorOpts}/>
            </div>
        )
    }
}