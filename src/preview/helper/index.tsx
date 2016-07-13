/// <reference path="../../../../../../typings-module/wolfy87-eventemitter.d.ts" />
import * as EventEmitter from 'wolfy87-eventemitter'
import * as React from 'react'
import * as module from './module'
import * as _ from 'lodash'
import layoutStyleParser from '../../gaea/viewport/helper/layout-style-parser'
import {getComponents} from '../object-store/components'

const event = new EventEmitter()

export default class PreviewHelper extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    /**
     * 获取 mergedProps
     */
    getMergedProps() {
        // 获取组件class
        const components = getComponents()
        const componentElement = components[this.props.componentInfo.component]

        const mergedProps: any = _.cloneDeep(componentElement.defaultProps)
        const componentProps = this.props.componentInfo.props || {}

        if ('name' in componentProps) {
            mergedProps.name = componentProps.name
        }
        if ('options' in componentProps) {
            const newOptions = componentProps.options || {}
            Object.keys(newOptions).map(key=> {
                Object.keys(newOptions[key]).map(detailKey=> {
                    // 小心 false 和 -1 属性被吞了
                    if (newOptions[key][detailKey] !== undefined) {
                        mergedProps.options[key][detailKey] = newOptions[key][detailKey]
                    }
                })
            })
        }
        return mergedProps
    }

    render() {
        // 获取组件class
        const components = getComponents()
        const componentElement = components[this.props.componentInfo.component]

        // 将传入的参数与组件 defaultProps 做 merge,再传给组件
        const mergedProps: any = this.getMergedProps()

        /**
         * 如果组件是gaea-layout,添加子元素
         */
        let children: React.ReactElement<any> = null
        if (this.props.componentInfo.component === 'gaea-layout' && _.isArray(this.props.componentInfo.childs)) {
            children = this.props.componentInfo.childs.map((itemComponentInfo: any, index: number)=> {
                return <PreviewHelper key={index}
                                      componentInfo={itemComponentInfo}/>
            })
        }

        /**
         * 这里本来要给组件实例直接传 mergedProps,但是如果组件是 layout,可能部分属性会做调整以便于显示,所以有个判断分支
         */
        let resultElement: React.ReactElement<any>
        let layoutDragTargetStyle: any, layoutDragSourceStyle: any
        if (this.props.componentInfo.component === 'gaea-layout') {
            const styleParser = layoutStyleParser(_.cloneDeep(mergedProps))
            layoutDragTargetStyle = styleParser.layoutDragTargetStyle
            layoutDragSourceStyle = styleParser.layoutDragSourceStyle
            resultElement = React.createElement(componentElement, styleParser.layoutMergedProps, children)
        } else {
            resultElement = React.createElement(componentElement, mergedProps, children)
        }

        /**
         * 添加拖拽目标的 div
         */
        if (this.props.componentInfo.component === 'gaea-layout') {
            resultElement = (
                <div style={layoutDragTargetStyle}>
                    {resultElement}
                </div>
            )
        }

        /**
         * 添加拖拽源的 div
         */
        resultElement = (
            <div style={layoutDragSourceStyle}>
                {resultElement}
            </div>
        )

        return resultElement
    }
}