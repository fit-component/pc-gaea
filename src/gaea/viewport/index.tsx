import * as React from 'react'
import Helper from './helper'
import connect from '../utils/connect'
import EditBox from './edit-box'
import * as ReactDOM from 'react-dom'
import * as $ from 'jquery'
import * as _ from 'lodash'
import * as actions from '../stores/actions'
import SwitchSize from './switch-size'
import OuterMoveBox from './outer-move-box'
import * as rootProps from '../object-store/root-props'
import {setViewPort, setViewPort$dom} from '../object-store/view-port'
import Preview from '../../preview'
import * as module from './module'
import store from '../utils/configure-store'
import './index.scss'

@connect(
    (state: any) => {
        return {}
    },
    {}
)
export default class ViewPort extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    refs: any
    private $dom: JQuery

    componentWillMount() {
        const rootPropsJs = rootProps.getRootProps().toJS()
        this.setState({
            pageInfo: rootPropsJs.pageInfo,
            paddingSize: (100 - rootPropsJs.viewportSize) / 2
        })
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !_.isEqual(this.state, nextState)
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
        store.dispatch(actions.outMoveBoxClose())
        store.dispatch(actions.treeMoveBoxClose())
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

    /**
     * 修改当前渲染内容
     */
    freshView(pageInfo: any) {
        this.setState({
            pageInfo,
            renderKey: this.state.renderKey + 1
        })
    }

    render() {
        const viewPortStyle = {
            padding: `0 ${this.state.paddingSize}%`
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
                            <Helper key={this.state.renderKey}
                                    isInEdit={true}
                                    parent={null}
                                    position="pageInfo"
                                    ref="rootHelper"
                                    componentInfo={this.state.pageInfo}/>
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
                            <Preview key={this.state.renderKey}
                                     componentInfo={this.state.pageInfo}
                                     components={rootPropsJs.components}/>
                        </div>
                    </div>
                </div>
            )
        }

        return Children
    }
}