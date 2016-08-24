import * as React from 'react'
import * as typings from './page.type'
import {observer, inject} from 'mobx-react'

import {Layout, Header, Sidebar, Section} from '../../../../layout-global/src'
import * as classNames from 'classnames'
import * as _ from 'lodash'

import SidebarTools from './sidebar-tools/sidebar-tools.component'
import SidebarToolsPreview from './sidebar-tools-preview/sidebar-tools-preview.component'
import Viewport from './viewport/viewport.component'
import ViewportSidebarResize from './viewport-sidebar-resize/viewport-sidebar-resize.component'
import HeaderNav from './header/header.component'
import EditBox from '../panel/edit-box/edit-box.component'
import OuterMoveBox from './outer-move-box/outer-move-box.component'

import Preview from '../../preview/preview.component'

import './page.scss'

@inject('viewport', 'application') @observer
export default class Page extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentWillMount() {
        if (_.isEmpty(this.props.application.defaultValue)) {
            // 如果没有 defaultValue, 生成根节点
            this.props.viewport.createRootUniqueId()
            const LayoutClass = this.props.application.getComponentByUniqueKey('gaea-layout')
            // 布置最外层的画布
            let layoutOptions = _.cloneDeep(LayoutClass.defaultProps.options)
            layoutOptions['minHeight'].value = '100%'
            this.props.viewport.components.set(this.props.viewport.rootMapUniqueKey, {
                props: {
                    uniqueKey: 'gaea-layout',
                    icon: LayoutClass.defaultProps.icon,
                    name: '画布',
                    options: layoutOptions
                },
                layoutChilds: [],
                parentMapUniqueKey: null
            })
        } else {
            // 有的话, 直接用 defaultValue
            Object.keys(this.props.application.defaultValue).forEach(mapUniqueKey=> {
                const defaultInfo = this.props.application.defaultValue[mapUniqueKey]
                const ComponentClass = this.props.application.getComponentByUniqueKey(defaultInfo.props.uniqueKey)

                // 如果是根节点, 设置根据点 id
                if (defaultInfo.parentMapUniqueKey === null) {
                    this.props.viewport.setRootUniqueId(mapUniqueKey)
                }

                // 组合成完整的 options
                let options = _.cloneDeep(ComponentClass.defaultProps.options)
                defaultInfo.props.options && Object.keys(defaultInfo.props.options).forEach(optionKey=> {
                    // 只要设置的有 optionKey, 那肯定有编辑后的 value
                    options[optionKey].value = defaultInfo.props.options[optionKey].value
                })

                this.props.viewport.components.set(mapUniqueKey, {
                    props: {
                        uniqueKey: defaultInfo.props.uniqueKey,
                        icon: ComponentClass.defaultProps.icon,
                        name: defaultInfo.props.name || ComponentClass.defaultProps.name,
                        options
                    },
                    layoutChilds: defaultInfo.layoutChilds || [],
                    parentMapUniqueKey: defaultInfo.parentMapUniqueKey
                })
            })
        }

    }

    render() {
        const sectionClasses = classNames({
            'section': true,
            'section-transition': !this.props.application.isSidebarMoving,
            'preview': this.props.application.isPreview
        })

        return (
            <Layout className="_namespace">

                <Header height={this.props.application.headerHeight}>
                    <HeaderNav />
                </Header>

                <Sidebar width={this.props.application.sidebarWidth}
                         className="sidebar"
                         direction="right">
                    <SidebarTools />
                    <SidebarToolsPreview />
                    <ViewportSidebarResize />
                </Sidebar>

                <Section className={sectionClasses}>
                    <div className="section-container">
                        <Viewport/>
                        <EditBox/>
                        <OuterMoveBox />
                        {this.props.application.isPreview &&
                        <div className="preview-container">
                            <Preview value={this.props.viewport.getIncrementComponentsInfo()}/>
                        </div>
                        }
                    </div>
                </Section>

            </Layout>
        )
    }
}

