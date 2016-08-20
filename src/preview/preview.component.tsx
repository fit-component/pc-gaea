import * as React from 'react'
import * as typings from './preview.type'
import PreviewStore from './store/preview'
import {observer, Provider} from 'mobx-react'

import baseComponents from '../base-components'

import PreviewHelper from './preview-helper/preview-helper.component'

@observer
export default class Preview extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    private preview = new PreviewStore()

    componentWillMount() {
        // 设置基础组件
        this.preview.setBaseComponents(baseComponents)

        // 设置自定义组件
        this.preview.setCustomComponents(this.props.components)

        this.props.value && Object.keys(this.props.value).forEach(mapUniqueId=> {
            const defaultInfo = this.props.value[mapUniqueId]
            const ComponentClass = this.preview.getComponentByUniqueKey(defaultInfo.props.uniqueKey)

            // 设置根 mapUniqueId
            if (defaultInfo.parentMapUniqueId === null) {
                this.preview.setRootUniqueId(mapUniqueId)
            }

            // 组合成完整的 options
            let options = _.cloneDeep(ComponentClass.defaultProps.options)
            defaultInfo.props.options && Object.keys(defaultInfo.props.options).forEach(optionKey=> {
                // 只要设置的有 optionKey, 那肯定有编辑后的 value
                options[optionKey].value = defaultInfo.props.options[optionKey].value
            })

            this.preview.components.set(mapUniqueId, {
                props: {
                    uniqueKey: defaultInfo.props.uniqueKey,
                    icon: ComponentClass.defaultProps.icon,
                    name: defaultInfo.props.name || ComponentClass.defaultProps.name,
                    options
                },
                layoutChilds: defaultInfo.layoutChilds || [],
                parentMapUniqueId: defaultInfo.parentMapUniqueId
            })
        })
    }

    render() {
        return (
            <Provider preview={this.preview}>
                <PreviewHelper mapUniqueId={this.preview.rootMapUniqueId}/>
            </Provider>
        )
    }
}