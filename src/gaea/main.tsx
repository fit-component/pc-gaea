import * as React from 'react'
import connect from './utils/connect'
import PluginContext from '../plugin/index'
import {Layout, Header, Sidebar, Section} from '../../../layout-global/src'

import * as classNames from 'classnames'
import HeaderMenu from './header'
import * as headerModule from './header/module'
import SidebarTool from './sidebar'
import * as siderBarModule from './sidebar/module'
import Viewport from './viewport'

import ViewportSidebarResize from './viewport-sidebar-resize/viewport-sidebar-resize.component'

@connect(
    (state: any) => {
        return {
            layout: state.layout.toJS()
        }
    },
    {}
)
export default class GaeaMain extends React.Component <any, any> {
    componentWillReceiveProps(nextProps: any) {
        if (this.props['layout'].sidebarWidth === nextProps['layout'].sidebarWidth) {
            return false
        }
        return true
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className']
        })

        const sectionClasses = classNames({
            'section': true,
            'section-transition': !this.props['layout'].sidebarMoveMouseDown,
            'preview': this.props['isPreview'] === true
        })

        let PlugHeader = PluginContext<headerModule.PropsInterface>(this.props['plugin'])(HeaderMenu)

        return (
            <Layout className={classes}>

                <Header height={40}>
                    <PlugHeader />
                </Header>

                <Sidebar width={this.props['layout'].sidebarWidth}
                         className="sidebar"
                         direction="right">
                    <SidebarTool />
                    <ViewportSidebarResize />
                </Sidebar>

                <Section className={sectionClasses}>
                    <Viewport/>
                </Section>

            </Layout>
        )
    }
}