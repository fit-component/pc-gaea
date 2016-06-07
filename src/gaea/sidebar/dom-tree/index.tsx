import * as React from 'react'
import TreeElement from './tree-element'
import connect from '../../utils/connect'
import './index.scss'

@connect(
    (state: any) => {
        return {
            rootPropsStore: state.rootProps.toJS()
        }
    },
    {}
)
export default class Sidebar extends React.Component <any ,any> {
    render() {
        console.log(this.props['rootProps'])
        return (
            <div className="_namespace">
                <TreeElement/>
            </div>
        )
    }
}