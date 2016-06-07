import * as React from 'react'
import Loading from '../../../../../common/loading/src'
import * as module from './module'

export default class InputComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        return (
            <Loading/>
        )
    }
}