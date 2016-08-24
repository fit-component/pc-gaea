import * as React from 'react'
import * as typings from './preview-helper.type'
const {View} = require('react-native')

import fitLayoutStyle from '../../utils/fit-layout-style'

export default class PreviewHelper extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 对应 store 中的数据
    private componentInfo: FitGaea.ViewportComponentInfo

    // 自身真实组件的 class
    private SelfComponent: React.ComponentClass<FitGaea.ComponentProps>

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.preview.components.get(this.props.mapUniqueKey)

        // 获取当前要渲染的组件 class
        this.SelfComponent = this.props.preview.getComponentByUniqueKey(this.componentInfo.props.uniqueKey)
    }

    render() {
        // 子元素
        let childs: Array<React.ReactElement<any>> = null

        // gaea-layout 可以有子元素
        if (this.componentInfo.props.uniqueKey === 'gaea-layout' && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey=> {
                return (
                    <PreviewHelper key={layoutChildUniqueMapKey}
                                   preview={this.props.preview}
                                   mapUniqueKey={layoutChildUniqueMapKey}/>
                )
            })
        }

        let componentProps = _.cloneDeep(this.componentInfo.props)
        let outerStyle: React.CSSProperties = {}

        if (this.componentInfo.props.uniqueKey === 'gaea-layout') {
            outerStyle = fitLayoutStyle(componentProps.options)
        }

        // 因为要适配 react-native, 删除不兼容的属性
        delete outerStyle.display

        return (
            <View style={outerStyle}>
                {React.createElement(this.SelfComponent, componentProps, childs)}
            </View>
        )
    }
}