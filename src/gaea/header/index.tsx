import * as React from 'react'
import {Menu, RightMenu, MenuItem} from '../../../../menu/src'
import connect from '../utils/connect'
import {getViewPort} from '../object-store/view-port'
import {addVersion} from '../object-store/root-props'
import {setHeaderComponentInstance} from '../object-store/header'
import * as actions from '../stores/actions'
import store from '../utils/configure-store'
import * as classNames from 'classnames'
import * as rootProps from '../object-store/root-props'
import * as gaeaObjectStore from '../object-store/gaea'
import * as invariant from 'invariant'
import * as _ from 'lodash'
import * as module from './module'

import UserSetting from './user-setting'
import Online from './online'

import './index.scss'


@connect(
    (state:any) => {
        return {
            preview: state.preview.toJS(),
            userSetting: state.userSetting.toJS()
        }
    },
    {}
)
export default class Header extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps:module.PropsInterface = new module.Props()
    public state:module.StateInterface = new module.State()
    
    context: module.IRouterContext & module.ISomeOtherContext

    static contextTypes: React.ValidationMap<any> = {
        pluginInfo: React.PropTypes.object.isRequired
    };

    extendConfig: module.extendConfigStore = {}

    private getOrderItems (order:string[], itemMap: module.itemMapType, components:React.ComponentClass<any>[], isReverse:boolean = false):JSX.Element[] {
        let items:JSX.Element[] = order.map((key:string) => {
            if (itemMap[key]) {
                return itemMap[key];
            }
            else {
                let index = parseInt(key.substring(1)) - 1;
                return React.createElement(components[index], {
                    key: index
                });
            }
        });

        if (isReverse) {
            return _(items).reverse().value();
        }

        return items;
    }

    componentWillMount() {
        setHeaderComponentInstance(this)
    }

    shouldComponentUpdate(nextProps:module.PropsInterface, nextState:module.StateInterface) {
        if (nextProps.preview.isPreview === this.props.preview.isPreview && this.state === nextState) {
            return false
        }
        return true
    }

    /**
     * 咔嚓,保存一个版本快照
     */
    saveToVersion(id:string) {
        addVersion(id)
    }

    /**
     * 缓存插件的额外配置选项
     */
    handleConfigChange (key: string, value: any) {
        this.extendConfig[key] = value
    }

    /**
     * 保存
     */
    handleSave() {
        gaeaObjectStore.getGaea().props.onSave({
            pageInfo: rootProps.getRootProps().toJS().pageInfo,
            settings: this.props.userSetting,
            saveToVersion: this.saveToVersion.bind(this),
            extendConfig: this.extendConfig
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
    setCanUndoRedo(canUndo:boolean, canRedo:boolean) {
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
        });

        let MenuItems:JSX.Element[];
        let SettingItems:JSX.Element[] = [];

        let itemMap:module.itemMapType = {
            save: <MenuItem key="save" onClick={this.handleSave.bind(this)}>保存</MenuItem>,
            preview: <MenuItem key="preview" onClick={this.handlePreview.bind(this)}>{previewText}</MenuItem>,
            redo: <MenuItem key="redo" className={redoClasses} onClick={this.redo.bind(this)}><i className="fa fa-rotate-right"/></MenuItem>,
            undo: <MenuItem key="undo" className={undoClasses} onClick={this.undo.bind(this)}><i className="fa fa-undo"/></MenuItem>,
            online: <Online key="online" />,
            settings: <UserSetting key="settings" handleConfigChange={this.handleConfigChange.bind(this)}/>
        };

        if (this.context.pluginInfo.headerConfig) {
            let headerPlus = this.context.pluginInfo.headerConfig;

            if (headerPlus.left) {
                let leftOrder = headerPlus.left.order || ['settings'];
                let leftComponent = headerPlus.left.components;
                invariant(leftOrder, 'component order is needed, the default order is [\'save\', \'preview\', \'redo\', \'undo\']');
                SettingItems = this.getOrderItems(leftOrder, itemMap, leftComponent);
            }

            if(headerPlus.right) {
                let rightOrder = headerPlus.right.order || ['save', 'preview', 'redo', 'undo', 'online'];
                let rightComponent = headerPlus.right.components;
                invariant(rightOrder, 'component order is needed, the default order is [\'save\', \'preview\', \'redo\', \'undo\']');
                MenuItems = this.getOrderItems(rightOrder, itemMap, rightComponent, true);
            }
        }
        else {
            MenuItems = [
                <MenuItem key="save" onClick={this.handleSave.bind(this)}>保存</MenuItem>,
                <MenuItem key="preview" onClick={this.handlePreview.bind(this)}>{previewText}</MenuItem>,
                <MenuItem key="redo" className={redoClasses} onClick={this.redo.bind(this)}><i className="fa fa-rotate-right"/></MenuItem>,
                <MenuItem key="undo" className={undoClasses} onClick={this.undo.bind(this)}><i className="fa fa-undo"/></MenuItem>,
                <Online key="online" />
            ]
            SettingItems = [
                <UserSetting key="settings" handleConfigChange={this.handleConfigChange.bind(this)}/>
            ]
        }

        return (
            <Menu className="_namespace"
                  height={40}>
                <MenuItem brand
                          to="/designer">{rootProps.getRootProps().toJS().title}</MenuItem>
                {SettingItems}
                <RightMenu>
                    {MenuItems}
                </RightMenu>
            </Menu>
        )
    }
}