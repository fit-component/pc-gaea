/// <reference path="../../../../../../../../typings-module/react-contextmenu.d.ts" />

import * as React from 'react'
import * as module from './module'
import * as classNames from 'classnames'
import {getRootProps} from '../../../object-store/root-props'
import {ContextMenuLayer} from 'react-contextmenu'
import ContextMenu from './context-menu'
import {getGaea} from '../../../object-store/gaea'
import './index.scss'

@ContextMenuLayer('sourceContainer')
class SourceComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    componentWillMount() {
        // 初始化时获取文件列表
        const gaea = getGaea()
        gaea.props.getSourceFileList('', (fileList: Array<module.SourceFile>)=> {
            this.setState({
                lists: fileList
            })
        })
    }

    /**
     * 点击某个文件夹触发的获取文件列表
     */
    getSourceFileList(folderId: string) {
        const gaea = getGaea()
        gaea.props.getSourceFileList(folderId, (fileList: Array<module.SourceFile>)=> {
            this.setState({
                lists: fileList
            })
        })
    }

    /**
     * 根据文件类型返回dom节点
     */
    generateItemByType(type: string) {

    }

    render() {
        const Lists = this.state.lists.map((item: module.SourceFile, index: number)=> {
            const Children = this.generateItemByType(item.type)
            return (
                <div key={index}>{Children}</div>
            )
        })

        return (
            <div className="source-container">
                {Lists}
            </div>
        )
    }
}

export default class Container extends React.Component <any,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            path: ['/']
        }
    }

    /**
     * 路径发生变化
     */
    handlePathChange(path: Array<string>) {
        this.setState({
            path
        })
    }

    render() {
        return (
            <div className="_namespace">
                <SourceComponent onPathChange={this.handlePathChange.bind(this)}/>
                <ContextMenu path={this.state.path}/>
            </div>
        )
    }
}