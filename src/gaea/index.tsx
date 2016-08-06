/// <reference path="../../../../../typings-module/redux-immutablejs.d.ts" />
/// <reference path="../../../../../typings-module/react-dnd-html5-backend.d.ts" />
/// <reference path="../../../../../typings-module/immutablediff.d.ts" />
/// <reference path="../../../../../typings-module/immutablepatch.d.ts" />
/// <reference path="../../models/dom-tree.d.ts" />

import * as React from 'react'
import * as classNames from 'classnames'
import * as module from './module'
import {others} from '../../../../common/transmit-transparently/src'
import {Layout, Header, Sidebar, Section} from '../../../layout-global/src'
import {Provider} from 'react-redux'
import store from './utils/configure-store'
import HTML5Backend from 'react-dnd-html5-backend'
import DragDropContext from './utils/drag-drop-context'
import * as rootProps from './object-store/root-props'
import * as gaeaObjectStore from './object-store/gaea'
import PluginContext from '../plugin/index'
import './index.scss'

import HeaderMenu from './header'
import * as headerModule from './header/module'
import SidebarTool from './sidebar'
import * as siderBarModule from './sidebar/module'
import Viewport from './viewport'

@DragDropContext(HTML5Backend)
export default class Gaea extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    componentWillMount() {
        rootProps.initRootProps(this.props)
        gaeaObjectStore.setGaea(this)
    }

    setPreview(isPreview: boolean) {
        this.setState({
            isPreview
        })
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className']
        })

        const sectionClasses = classNames({
            'section': true,
            'preview': this.state.isPreview === true
        })

        const { plugin } = this.props;

        let LayoutProps = others(new module.Props(), this.props);
        delete LayoutProps.pageInfo;
        delete LayoutProps.plugin;

        let PlugHeader = PluginContext<headerModule.PropsInterface>(plugin)(HeaderMenu);
        let PlugSideBar = PluginContext<siderBarModule.PropsInterface>(plugin)(SidebarTool)

        return (
            <Provider store={store}>
                <Layout {...LayoutProps}
                    className={classes}>

                    <Header height={40}>
                        <PlugHeader />
                    </Header>

                    <Sidebar width={240}
                             className="sidebar"
                             direction="right">
                        <PlugSideBar />
                    </Sidebar>

                    <Section className={sectionClasses}>
                        <Viewport/>
                    </Section>

                </Layout>
            </Provider>
        )
    }
}
