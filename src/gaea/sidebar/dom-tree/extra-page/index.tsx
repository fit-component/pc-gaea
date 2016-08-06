import * as React from 'react'
import * as modules from './module'
import {getComponents} from '../../../object-store/components'
import './index.scss'

export default class ExtraPage extends React.Component <modules.PropsDefine, modules.StateDefine> {
    static defaultProps = modules.defaultProps

    constructor(props: modules.PropsDefine) {
        super(props)
        this.state = modules.defaultState
    }

    getElementByType() {
        switch (this.props.info.type) {
            case 'componentPreview':
                const components = getComponents()
                return React.createElement(components[this.props.info.componentPreviewName])
        }
    }

    render() {
        if (this.props.info.type === '')return null

        return (
            <div className="_namespace">
                {this.getElementByType.call(this)}
            </div>
        )
    }
}