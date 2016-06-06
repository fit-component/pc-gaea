import * as React from 'react'
import Helper from './helper'
import connect from '../utils/connect'
import EditBox from './edit-box'
import * as ReactDOM from 'react-dom'
import * as $ from 'jquery'
import * as actions from '../stores/actions'
import SwitchSize from './switch-size'
import OuterMoveBox from './outer-move-box'
import './index.scss'

@connect(
    (state: any) => {
        return {rootProps: state.rootProps.toJS()}
    },
    actions
)
export default class ViewPort extends React.Component <any ,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            paddingSize: 0
        }
    }

    shouldComponentUpdate(nextProps: any) {
        /**
         * 如果因为 rootProps 有更新,不要重新 render 整个 root
         * 因为子元素已经局部更新过了,并且触发了action更新了 rootProps
         * 再刷新是没有意义的资源浪费
         */
        if (nextProps.rootProps !== this.props['rootProps']) {
            return false
        }
        return true
    }

    componentDidMount() {
        const $dom = $(ReactDOM.findDOMNode(this))
        $(document).ready(()=> {
            const offset = $dom.offset()
            this.props['sectionSetPosition']({
                top: offset.top,
                left: offset.left,
                width: $dom.outerWidth(),
                height: $dom.outerHeight()
            })
        })
    }

    setPaddingSize(size: number) {
        this.setState({
            paddingSize: size
        })
    }

    /**
     * 鼠标离开视图区域
     */
    handleViewPortLeave() {
        this.props['outMoveBoxClose']()
    }

    render() {
        const rootComponent = (
            <Helper isInEdit={true}
                    parent={null}
                    position={['pageInfo']}
                    componentInfo={this.props['rootProps'].pageInfo}/>
        )

        const viewPortStyle = {
            padding: `0 ${this.state['paddingSize']}%`
        }

        return (
            <div className="_namespace">
                <SwitchSize setPaddingSize={this.setPaddingSize.bind(this)}/>
                <EditBox/>
                <OuterMoveBox/>
                <div className="view-port"
                     style={viewPortStyle}>
                    <div className="white-bg"
                         onMouseLeave={this.handleViewPortLeave.bind(this)}>
                        {rootComponent}
                    </div>
                </div>
            </div>
        )
    }
}