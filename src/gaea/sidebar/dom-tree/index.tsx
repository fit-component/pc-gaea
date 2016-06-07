import * as React from 'react'
import TreeElement from './tree-element'
import connect from '../../utils/connect'
import * as rootProps from '../../object-store/root-props'
import {Tree} from '../../../../../tree/src'
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
    shouldComponentUpdate(nextProps: any) {
        if (_.isEqual(this.props['rootPropsStore'], nextProps['rootPropsStore'])) {
            return false
        }
        return true
    }

    render() {
        const rootPropsJs = rootProps.getRootProps().toJS()
        
        return (
            <Tree className="_namespace"
                  defaultExpendAll={true}>
                <TreeElement info={rootPropsJs.pageInfo}/>
            </Tree>
        )
    }
}