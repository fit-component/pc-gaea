import * as React from 'react'
import {Menu, RightMenu, MenuItem} from '../../../../menu/src'
import connect from '../utils/connect'
import {getViewPort} from '../object-store/view-port'
import {getHistorys} from '../object-store/root-props'
import {setHeaderComponentInstance} from '../object-store/header'
import * as actions from '../stores/actions'
import store from '../utils/configure-store'
import * as classNames from 'classnames'
import * as rootProps from '../object-store/root-props'
import * as gaeaObjectStore from '../object-store/gaea'
import * as module from './module'
import UserSetting from './user-setting'
import './index.scss'

@connect(
    (state: any) => {
        return {
            preview: state.preview.toJS(),
            userSetting: state.userSetting.toJS()
        }
    },
    {}
)
export default class Header extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    componentWillMount() {
        setHeaderComponentInstance(this)
    }

    shouldComponentUpdate(nextProps: module.PropsInterface, nextState: module.StateInterface) {
        if (nextProps.preview.isPreview === this.props.preview.isPreview && this.state === nextState) {
            return false
        }
        return true
    }

    /**
     * 保存
     */
    handleSave() {
        gaeaObjectStore.getGaea().props.onSave({
            pageInfo: rootProps.getRootProps().toJS().pageInfo,
            settings: this.props.userSetting,
            historys: getHistorys()
        })
    }

    /**
     * 预览/取消预览
     */
    handlePreview() {
        const nextPreview = !this.props.preview.isPreview

        const viewPort = getViewPort()
        viewPort.setPreview(nextPreview)
        gaeaObjectStore.getGaea().setPreview(nextPreview)
        store.dispatch(actions.previewChange(nextPreview))
    }

    /**
     * 回退
     */
    undo() {
        if (!this.state.canUndo)return
        const result = rootProps.undoHistory()
    }

    /**
     * 前进
     */
    redo() {
        if (!this.state.canRedo)return
        const result = rootProps.redoHistory()
    }

    /**
     * 设置 canUndo canRedo
     */
    setCanUndoRedo(canUndo: boolean, canRedo: boolean) {
        this.setState({
            canUndo,
            canRedo
        })
    }

    render() {
        let previewText = '预览'
        if (this.props.preview.isPreview) {
            previewText = '取消'
        }

        const undoClasses = classNames({
            disabled: !this.state.canUndo
        })

        const redoClasses = classNames({
            disabled: !this.state.canRedo
        })

        return (
            <Menu className="_namespace"
                  height={40}>
                <MenuItem brand
                          to="/designer">{rootProps.getRootProps().toJS().title}</MenuItem>
                <UserSetting/>
                <RightMenu>
                    <MenuItem onClick={this.handleSave.bind(this)}>保存</MenuItem>
                    <MenuItem onClick={this.handlePreview.bind(this)}>{previewText}</MenuItem>
                    <MenuItem className={redoClasses}
                              onClick={this.redo.bind(this)}><i className="fa fa-rotate-right"/></MenuItem>
                    <MenuItem className={undoClasses}
                              onClick={this.undo.bind(this)}><i className="fa fa-undo"/></MenuItem>
                </RightMenu>
            </Menu>
        )
    }
}