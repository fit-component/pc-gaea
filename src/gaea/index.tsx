import * as React from 'react'
import * as classNames from 'classnames'
import * as module from './module'
import {others} from '../../../../common/transmit-transparently/src'
import {Layout, Header, Sidebar, Section} from '../../../layout-global/src'
import './index.scss'

export default class bluekit extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    render() {
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className']
        })

        return (
            <Layout {...others(new module.Props(), this.props)}
                className={classes}>
                <Header height={60}>导航条</Header>
                <Sidebar width={60}>侧边栏</Sidebar>
                <Section>盖亚</Section>
            </Layout>
        )
    }
}