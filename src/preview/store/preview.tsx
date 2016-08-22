/**
 * 预览时的页面数据
 */

import {observable, computed, map, transaction, ObservableMap} from 'mobx'
import * as React from 'react'

export default class Preview {
    /**
     * 基础组件
     */
    baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>> = []

    /**
     * 设置基础组件
     */
    setBaseComponents(baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>) {
        this.baseComponents = baseComponents
    }

    /**
     * 定制组件
     */
    customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>> = []

    /**
     * 设置定制组件
     */
    setCustomComponents(customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>) {
        this.customComponents = customComponents
    }

    /**
     * 根据 uniqueKey 获取组件
     */
    getComponentByUniqueKey(uniqueKey: string) {
        for (let component of this.baseComponents) {
            if (component.defaultProps.uniqueKey === uniqueKey) {
                return component
            }
        }

        for (let component of this.customComponents) {
            if (component.defaultProps.uniqueKey === uniqueKey) {
                return component
            }
        }

        return null
    }

    /**
     * 已实例化在编辑区域组件的集合
     */
    components: ObservableMap<FitGaea.ViewportComponentInfo> = map<FitGaea.ViewportComponentInfo>()

    /**
     * 根节点的唯一 id
     */
    rootMapUniqueKey: string

    /**
     * 设置根节点唯一 id
     */
    setRootUniqueId(uniqueId: string) {
        this.rootMapUniqueKey = uniqueId
    }
}