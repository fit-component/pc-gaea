import * as React from 'react'
import connect from '../../../utils/connect'
import DragSource from './drag-source'
import currencyComponents from '../../../../currency-components'
import {Button, ButtonGroup} from '../../../../../../button/src'
import * as actions from '../../../stores/actions'
import * as rootProps from '../../../object-store/root-props'
import {setComponents} from '../../../object-store/components'

const switchTypes = [{
    type: 'custom',
    name: '定制'
}, {
    type: 'currency',
    name: '通用'
},{
    type: 'group',
    name: '组合'
}]

export interface StateProps {
    /**
     * 选中组件类型
     */
    selectedType?: string
}

@connect(
    (state: any) => {
        return {}
    },
    actions
)
export default class Sidebar extends React.Component <any ,any> {
    state: StateProps = {
        selectedType: 'custom'
    }

    componentWillMount() {
        /**
         * 把所有组件都放到 redux components 里
         */
        // 初始状态先获取所有组件的引用
        let components: any = {}

        currencyComponents.map(item=> {
            components[item.defaultProps.uniqueKey] = item
        })

        const rootPropsJs = rootProps.getRootProps().toJS()
        rootPropsJs.components.map((item: any)=> {
            components[item.defaultProps.uniqueKey] = item
        })

        setComponents(components)
    }

    handleChangeSelectedType(type: string) {
        this.setState({
            selectedType: type
        })
    }

    render() {
        const rootPropsJs = rootProps.getRootProps().toJS()

        // 组件类型选择按钮组
        const SwitchButtonGroup = switchTypes.map((item, index)=> {
            return (
                <Button type="secondary"
                        key={index}
                        onClick={this.handleChangeSelectedType.bind(this,item.type)}
                        active={item.type===this.state.selectedType}>{item.name}</Button>
            )
        })

        // 根据不同类型实例化各个可拖拽的按钮
        let DragComponents: any
        switch (this.state.selectedType) {
            case 'custom':
                DragComponents = rootPropsJs.components.map((item: any, index: number)=> {
                    return (
                        <DragSource key={index}
                                    uniqueKey={item.defaultProps.uniqueKey}>
                            <i className={`fa fa-${item.defaultProps.icon || 'cube'} icons`}/>
                            {item.defaultProps.name}
                        </DragSource>
                    )
                })
                break
            case 'currency':
                DragComponents = currencyComponents.map((item, index)=> {
                    return (
                        <DragSource key={index}
                                    uniqueKey={item.defaultProps.uniqueKey}>
                            <i className={`fa fa-${item.defaultProps.icon || 'cube'} icons gaea`}/>
                            {item.defaultProps.name}
                        </DragSource>
                    )
                })
                break
            case 'group':
                DragComponents = null
                break
        }

        return (
            <div className="_namespace components-container">
                <div className="container">
                    {DragComponents}
                </div>
                <div className="switch">
                    <ButtonGroup vertical>{SwitchButtonGroup}</ButtonGroup>
                </div>
            </div>
        )
    }
}