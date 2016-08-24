import * as React from 'react'
import * as typings from './preview.type'
import * as _ from 'lodash'
import PreviewStore from './store/preview'

import PreviewHelper from './preview-helper/preview-helper.component'

export default class Preview extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    private preview = new PreviewStore()

    componentWillMount() {
        // 设置基础组件
        this.preview.setBaseComponents(this.props.baseComponents)

        // 设置自定义组件
        this.preview.setCustomComponents(this.props.customComponents)

        this.props.value && Object.keys(this.props.value).forEach(mapUniqueKey=> {
            const defaultInfo = this.props.value[mapUniqueKey]
            const ComponentClass = this.preview.getComponentByUniqueKey(defaultInfo.props.uniqueKey)

            // 设置根 mapUniqueKey
            if (defaultInfo.parentMapUniqueKey === null) {
                this.preview.setRootUniqueId(mapUniqueKey)
            }

            // 组合成完整的 options
            let options = _.cloneDeep(ComponentClass.defaultProps.options)
            defaultInfo.props.options && Object.keys(defaultInfo.props.options).forEach(optionKey=> {
                // 只要设置的有 optionKey, 那肯定有编辑后的 value
                options[optionKey].value = defaultInfo.props.options[optionKey].value
            })

            this.preview.components.set(mapUniqueKey, {
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

    render() {
        return (
            <PreviewHelper preview={this.preview}
                           mapUniqueKey={this.preview.rootMapUniqueKey}/>
        )
    }
}