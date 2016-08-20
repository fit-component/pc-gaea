/// <reference path="../../../../../../../../typings-module/react-draggable.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './edit-box.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from '../../../../../../../common/auto-bind/src'
import {Tabs, TabPanel} from '../../../../../../tabs/src'
import * as Draggable from 'react-draggable'

import Basic from './basic/basic.component'
import Event from './event/event.component'
import Script from './script/script.component'

import './edit-box.scss'

export type DraggableData = {
    node: HTMLElement,
    // lastX + deltaX === x
    x: number, y: number,
    deltaX: number, deltaY: number,
    lastX: number, lastY: number
}

@inject('application', 'viewport') @observer
export default class EditBox extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    private domInstance: Element

    componentDidMount() {
        this.domInstance = ReactDOM.findDOMNode(this)
    }

    @autoBindMethod handleDrag(event: Event, data: DraggableData) {
        let left = data.lastX
        let top = data.lastY

        this.props.viewport.setEditBoxPosition(left, top)
    }

    /**
     * 点击关闭按钮
     */
    @autoBindMethod handleCloseClick() {
        this.props.viewport.cancelEditComponent()
    }

    render() {
        if (this.props.viewport.currentEditComponentMapUniqueKey === null) {
            return null
        }

        const bounds = {
            left: 0,
            top: 0,
            right: this.props.viewport.viewportDomInstance.clientWidth - this.props.viewport.editBoxPosition.width,
            bottom: this.props.viewport.viewportDomInstance.clientHeight - this.props.viewport.editBoxPosition.height
        }

        const position = {
            x: this.props.viewport.editBoxPosition.left,
            y: this.props.viewport.editBoxPosition.top
        }

        const containerStyle = {
            width: this.props.viewport.editBoxPosition.width,
            height: this.props.viewport.editBoxPosition.height
        }

        return (
            <Draggable handle=".title-container"
                       bounds={bounds}
                       onDrag={this.handleDrag}
                       defaultPosition={position}>
                <div className="_namespace handle-drag"
                     style={containerStyle}>
                    <div className="container-box">
                        <span className="handle-drag-close"
                              onClick={this.handleCloseClick}>x</span>

                        <Tabs defaultActiveKey="basic"
                              type="retro"
                              className="_namespace edit-box-handle"
                              style={containerStyle}>
                            <TabPanel tab="基础"
                                      key="basic"
                                      className="edit-container">
                                <Basic/>
                            </TabPanel>
                            <TabPanel tab="脚本"
                                      key="script"
                                      className="edit-container">
                                <Script/>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </Draggable>
        )
    }
}