import * as React from 'react'
import Tools from './tools'
import DomTree from './dom-tree'
import './index.scss'

export default class Sidebar extends React.Component <any ,any> {
    render() {
        return (
            <div className="_namespace">
                <Tools/>
                <DomTree/>
            </div>
        )
    }
}