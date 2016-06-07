import * as React from 'react'
import TreeElement from './tree-element'
import './index.scss'

export default class Sidebar extends React.Component <any ,any> {
    render() {
        return (
            <div className="_namespace">
                <TreeElement/>
            </div>
        )
    }
}