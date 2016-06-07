import * as React from 'react'
import Helper from './helper'
import connect from '../utils/connect'
import EditBox from './edit-box'
import * as ReactDOM from 'react-dom'
import * as $ from 'jquery'
import * as actions from '../stores/actions'
import SwitchSize from './switch-size'
import OuterMoveBox from './outer-move-box'
import * as rootProps from '../object-store/root-props'
import './index.scss'

@connect(
    (state: any) => {
        return {}
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

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return this.state !== nextState
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
        const rootPropsJs = rootProps.getRootProps().toJS()

        const rootComponent = (
            <Helper isInEdit={true}
                    parent={null}
                    position="pageInfo"
                    componentInfo={rootPropsJs.pageInfo}/>
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