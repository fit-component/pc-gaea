/// <reference path="../../../../../typings-module/redux-immutablejs.d.ts" />
/// <reference path="../../../../../typings-module/react-dnd-html5-backend.d.ts" />

import * as React from 'react'
import * as classNames from 'classnames'
import * as module from './module'
import {others} from '../../../../common/transmit-transparently/src'
import {Layout, Header, Sidebar, Section} from '../../../layout-global/src'
import {Provider} from 'react-redux'
import reducer from './stores/reducers'
import configureStore from './utils/configure-store'
import HTML5Backend from 'react-dnd-html5-backend'
import DragDropContext from './utils/drag-drop-context'
import './index.scss'

import HeaderMenu from './header'
import SidebarTool from './sidebar'
import Viewport from './viewport'

import * as actions from './stores/actions'

const store = configureStore({}, reducer)

@DragDropContext(HTML5Backend)
export default class Gaea extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    componentWillMount() {
        store.dispatch(actions.rootPropsInit(this.props))
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className']
        })

        return (
            <Provider store={store}>
                <Layout {...others(new module.Props(), this.props)}
                    className={classes}>

                    <Header height={40}>
                        <HeaderMenu/>
                    </Header>

                    <Sidebar width={240}
                             direction="right">
                        <SidebarTool/>
                    </Sidebar>

                    <Section className="section">
                        <Viewport/>
                    </Section>

                </Layout>
            </Provider>
        )
    }
}