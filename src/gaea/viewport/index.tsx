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
import {setViewPort, setViewPort$dom} from '../object-store/view-port'
import Preview from '../../preview'
import './index.scss'

@connect(
    (state: any) => {
        return {}
    },
    actions
)
export default class ViewPort extends React.Component <any ,any> {
    refs: any
    private $dom: JQuery

    constructor(props: any) {
        super(props)
        this.state = {
            paddingSize: 0,
            isPreview: false
        }
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return this.state !== nextState
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
        setViewPort(this)
        setViewPort$dom(this.$dom)
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
        this.props['treeMoveBoxClose']()
    }

    /**
     * 通过位置寻找子元素
     */
    getChildByPositions(positions: Array<number|string>) {
        let instance = this.refs['rootHelper']
        positions.forEach(number=> {
            instance = instance.refs[number]
        })
        return instance
    }

    /**
     * 设置是否为预览模式
     */
    setPreview(isPreview?: boolean) {
        this.setState({
            isPreview
        })
    }

    render() {
        const rootPropsJs = rootProps.getRootProps().toJS()

        const rootComponent = (
            <Helper isInEdit={true}
                    parent={null}
                    position="pageInfo"
                    ref="rootHelper"
                    componentInfo={rootPropsJs.pageInfo}/>
        )

        const viewPortStyle = {
            padding: `0 ${this.state['paddingSize']}%`
        }

        let Children: React.ReactElement<any>

        if (!this.state.isPreview) {
            Children = (
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
        } else {
            const rootPropsJs = rootProps.getRootProps().toJS()
            Children = (
                <div className="_namespace">
                    <SwitchSize setPaddingSize={this.setPaddingSize.bind(this)}/>
                    <div className="view-port"
                         style={viewPortStyle}>
                        <div className="white-bg">
                            <Preview componentInfo={rootPropsJs.pageInfo}
                                     components={rootPropsJs.components}/>
                        </div>
                    </div>
                </div>
            )
        }

        return Children
    }
}