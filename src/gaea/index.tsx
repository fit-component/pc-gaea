/// <reference path="../../../../../typings-module/redux-immutablejs.d.ts" />
/// <reference path="../../../../../typings-module/react-dnd-html5-backend.d.ts" />
/// <reference path="../../../../../typings-module/immutablediff.d.ts" />
/// <reference path="../../../../../typings-module/immutablepatch.d.ts" />
/// <reference path="../../models/dom-tree.d.ts" />

import * as React from 'react'
import * as module from './module'
import {Provider} from 'react-redux'
import store from './utils/configure-store'
import HTML5Backend from 'react-dnd-html5-backend'
import DragDropContext from './utils/drag-drop-context'
import * as rootProps from './object-store/root-props'
import * as gaeaObjectStore from './object-store/gaea'
import './index.scss'

import Main from './main'

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
        return (
            <Provider store={store}>
                <Main isPreview={this.state.isPreview} plugin={this.props.plugin}/>
            </Provider>
        )
    }
}
