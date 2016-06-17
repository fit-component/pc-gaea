import * as React from 'react'
import {Menu, RightMenu, MenuItem} from '../../../../menu/src'
import connect from '../utils/connect'
import {getViewPort} from '../object-store/view-port'
import * as actions from '../stores/actions'
import store from '../utils/configure-store'
import * as rootProps from '../object-store/root-props'
import * as gaeaObjectStore from '../object-store/gaea'
import * as module from './module'
import UserSetting from './user-setting'

@connect(
    (state: any) => {
        return {
            preview: state.preview.toJS()
        }
    },
    {}
)
export default class Header extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    shouldComponentUpdate(nextProps: module.PropsInterface) {
        if (nextProps.preview.isPreview === this.props.preview.isPreview) {
            return false
        }
        return true
    }

    /**
     * 保存
     */
    handleSave() {
        gaeaObjectStore.getGaea().props.onSave(rootProps.getRootProps().toJS())
    }

    /**
     * 预览/取消预览
     */
    handlePreview() {
        const nextPreview =  !this.props.preview.isPreview
            
        const viewPort = getViewPort()
        viewPort.setPreview(nextPreview)
        gaeaObjectStore.getGaea().setPreview(nextPreview)
        store.dispatch(actions.previewChange(nextPreview))
    }

    render() {
        let previewText = '预览'
        if (this.props.preview.isPreview) {
            previewText = '取消'
        }

        return (
            <Menu className="_namespace"
                  height={40}>
                <MenuItem brand
                          to="/designer">盖亚</MenuItem>
                <UserSetting/>
                <RightMenu>
                    <MenuItem onClick={this.handleSave.bind(this)}>保存</MenuItem>
                    <MenuItem onClick={this.handlePreview.bind(this)}>{previewText}</MenuItem>
                </RightMenu>
            </Menu>
        )
    }
}