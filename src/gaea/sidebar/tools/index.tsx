import * as React from 'react'
import {Tabs, TabPanel} from '../../../../../tabs/src'
import './index.scss'

import Components from './components'
import History from './history'

const renderTab = (name: string)=> {
    return (active: boolean)=> {
        if (!active) {
            return (
                <div className="center-text">{name}</div>
            )
        } else {
            return (
                <div className="tab-bar-content">
                    <div className="tab-bar-left">
                        <div className="tab-bar-left-nav"></div>
                    </div>
                    {name}
                    <div className="tab-bar-right">
                        <div className="tab-bar-right-nav"></div>
                    </div>
                </div>
            )
        }
    }
}

export default class Tools extends React.Component <any ,any> {
    render() {
        return (
            <Tabs defaultActiveKey="components"
                  className="_namespace tabs">
                <TabPanel tabRender={renderTab('组件')}
                          key="components"
                          className="tab-panel">
                    <Components/>
                </TabPanel>
                <TabPanel tabRender={renderTab('历史')}
                          key="history"
                          className="tab-panel">
                    <History/>
                </TabPanel>
            </Tabs>
        )
    }
}