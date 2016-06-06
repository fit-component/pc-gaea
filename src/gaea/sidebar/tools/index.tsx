import * as React from 'react'
import {Tabs, TabPanel} from '../../../../../tabs/src'
import './index.scss'

import Components from './components'
import History from './history'

export default class Sidebar extends React.Component <any ,any> {
    render() {
        return (
            <Tabs defaultActiveKey="components"
                  className="_namespace tabs">
                <TabPanel tab="组件"
                          key="components"
                          className="tab-panel">
                    <Components/>
                </TabPanel>
                <TabPanel tab="历史"
                          key="history"
                          className="tab-panel">
                    <History/>
                </TabPanel>
            </Tabs>
        )
    }
}