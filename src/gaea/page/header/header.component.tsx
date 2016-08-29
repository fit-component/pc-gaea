import * as React from 'react'
import * as typings from './header.type'
import {observer, inject} from 'mobx-react'

import {Menu, RightMenu, MenuItem} from '../../../../../menu/src'
import {autoBindMethod} from '../../../../../../common/auto-bind/src'
import notice from '../../../../../message/src'
import Setting from './setting/setting.component'
import Online from './online/online.component'

import * as keymaster from 'keymaster'
import * as classNames from 'classnames'

import './header.scss'

@inject('application', 'viewport')
@observer
export default class Header extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentWillMount() {
        // 添加快捷键
        keymaster('ctrl+z', this.undo)
        keymaster('command+z', this.undo)

        keymaster('ctrl+shift+z', this.redo)
        keymaster('command+shift+z', this.redo)

        keymaster('ctrl+s', this.handleSave)
        keymaster('command+s', this.handleSave)

        keymaster('ctrl+c', this.copy)
        keymaster('command+c', this.copy)

        keymaster('ctrl+v', this.paste)
        keymaster('command+v', this.paste)
    }

    componentWillUnmount() {
        // 移除快捷键
        keymaster.unbind('ctrl+z')
        keymaster.unbind('command+z')

        keymaster.unbind('ctrl+shift+z')
        keymaster.unbind('command+shift+z')

        keymaster.unbind('ctrl+s')
        keymaster.unbind('command+s')

        keymaster.unbind('ctrl+c')
        keymaster.unbind('command+c')

        keymaster.unbind('ctrl+v')
        keymaster.unbind('command+v')
    }

    /**
     * 点击保存按钮
     */
    @autoBindMethod handleSave() {
        // 获取增量编辑信息
        const componentsInfo = this.props.viewport.getIncrementComponentsInfo()
        console.log(JSON.stringify(componentsInfo))
        return false
    }

    /**
     * 点击预览按钮
     */
    @autoBindMethod handlePreview() {
        this.props.application.setPreview(!this.props.application.isPreview)
        if (this.props.application.isPreview){
            this.props.viewport.setCurrentEditComponentMapUniqueKey(null)
        }
    }

    /**
     * 回撤
     */
    @autoBindMethod undo() {
        this.props.viewport.undo()
    }

    /**
     * 重做
     */
    @autoBindMethod redo() {
        this.props.viewport.redo()
    }

    /**
     * 复制
     */
    @autoBindMethod copy() {
        this.props.viewport.copy(this.props.viewport.hoveringComponentMapUniqueKey)
    }

    /**
     * 粘贴
     */
    @autoBindMethod paste() {
        if (!this.props.viewport.paste(this.props.viewport.hoveringComponentMapUniqueKey)) {
            notice.warning('此处无法粘贴')
        }
    }

    render() {
        const undoClasses = classNames({
            'operate-disable': !this.props.viewport.canUndo
        })

        const redoClasses = classNames({
            'operate-disable': !this.props.viewport.canRedo
        })

        return (
            <Menu className="_namespace"
                  height={this.props.application.headerHeight - 1}>
                <MenuItem brand>{this.props.application.title}</MenuItem>
                <Setting/>

                <RightMenu>
                    <MenuItem key="save"
                              onClick={this.handleSave}>保存</MenuItem>
                    <MenuItem key="preview"
                              onClick={this.handlePreview}>{this.props.application.isPreview ? '取消' : '预览'}</MenuItem>
                    <MenuItem key="redo"
                              className={redoClasses}
                              onClick={this.redo}><i className="fa fa-rotate-right"/></MenuItem>
                    <MenuItem key="undo"
                              className={undoClasses}
                              onClick={this.undo}><i className="fa fa-undo"/></MenuItem>
                </RightMenu>
            </Menu>
        )
    }
}

// <Online key="online"/>