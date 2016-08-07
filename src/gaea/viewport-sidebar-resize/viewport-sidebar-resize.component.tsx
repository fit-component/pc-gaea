import * as React from 'react'
import * as Types from './viewport-sidebar-resize.type'
import store from '../utils/configure-store'
import * as actions from '../stores/actions'
import * as _ from 'lodash'
import './viewport-sidebar-resize.scss'

export default class ViewportSidebarResize extends React.Component <Types.PropsDefine, Types.StateDefine> {
    static defaultProps = new Types.Props()

    constructor(props: Types.PropsDefine) {
        super(props)
        this.state = new Types.State()
    }

    componentDidMount() {
        // 监听鼠标移动
        document.addEventListener('mousemove', this.handleMouseMove.bind(this))
        // 监听鼠标松开
        document.addEventListener('mouseup', this.handleMouseUp.bind(this))
    }

    componentWillUnmount() {
        // 取消监听
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this))
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this))
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !_.isEqual(this.state, nextState)
    }

    /**
     * 鼠标移动时的回调
     */
    handleMouseMove(event: MouseEvent) {
        if (!this.state.isMouseTapping)return
        store.dispatch(actions.layoutSetSidebarWidth(event.movementX))
    }

    /**
     * 鼠标点下
     */
    handleMouseDown() {
        this.setState({
            isMouseTapping: true
        })
        store.dispatch(actions.layoutSidebarMoveDownStart())
    }

    /**
     * 鼠标松开（全局）
     */
    handleMouseUp() {
        this.setState({
            isMouseTapping: false
        })
        store.dispatch(actions.layoutSidebarMoveDownEnd())
    }

    render() {
        return (
            <div className="_namespace"
                 onMouseDown={this.handleMouseDown.bind(this)}></div>
        )
    }
}