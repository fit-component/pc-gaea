import * as React from 'react'
import {Tabs, TabPanel} from '../../../../../tabs/src'
import './index.scss'

import Components from './components'
import History from './history'
import Source from './source'

export default class Tools extends React.Component <any ,any> {
    render() {
        return (
            <Tabs defaultActiveKey="components"
                  type="retro"
                  className="_namespace">
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
                <TabPanel tab="资源"
                          key="source"
                          className="tab-panel">
                    <Source/>
                </TabPanel>
            </Tabs>
        )
    }
}