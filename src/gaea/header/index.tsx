import * as React from 'react'
import {Menu, RightMenu, MenuItem} from '../../../../menu/src'
import connect from '../utils/connect'
import * as rootProps from '../object-store/root-props'

import UserSetting from './user-setting'

export default class Header extends React.Component <any ,any> {
    handleSave() {
        console.log('保存', rootProps.getRootProps().toJS())
    }

    render() {
        return (
            <Menu height={40}>
                <MenuItem brand
                          to="/designer">盖亚</MenuItem>
                <UserSetting/>
                <RightMenu>
                    <MenuItem onClick={this.handleSave.bind(this)}>保存</MenuItem>
                    <MenuItem>预览（还没做）</MenuItem>
                </RightMenu>
            </Menu>
        )
    }
}