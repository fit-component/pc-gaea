import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as $ from 'jquery'
import TreeElement from './tree-element'
import connect from '../../utils/connect'
import * as rootProps from '../../object-store/root-props'
import {Tree} from '../../../../../tree/src'
import * as actions from '../../stores/actions'
import {setDomTree, set$domTree} from '../../object-store/dom-tree'
import * as module from './module'
import store from '../../utils/configure-store'
import TreeMoveBox from './tree-move-box'
import * as _ from 'lodash'
import './index.scss'

@connect(
    (state: any) => {
        return {
            rootPropsStore: state.rootProps.toJS()
        }
    },
    actions
)
export default class DomTree extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    refs: any
    private $dom: JQuery

    componentWillMount() {
        setDomTree(this)

        const rootPropsJs = rootProps.getRootProps().toJS()
        this.setState({
            pageInfo: _.cloneDeep(rootPropsJs.pageInfo)
        })

        this.setCount(rootProps.getCount())
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
        set$domTree(this.$dom)
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (_.isEqual(this.props.rootPropsStore, nextProps.rootPropsStore) && this.state === nextState) {
            return false
        }
        return true
    }

    setCount(count: number) {
        this.setState({
            count
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
    getChildByPositions(positions: Array<number>) {
        let instance = this.refs['rootTreeElement']
        positions.forEach(number=> {
            instance = instance.refs[number]
        })

        return instance
    }

    /**
     * 修改当前渲染内容
     */
    freshView(pageInfo: any) {
        this.setState({
            pageInfo:_.cloneDeep(pageInfo),
            renderKey: this.state.renderKey + 1
        })
    }

    render() {
        return (
            <div className="_namespace"
                 onMouseLeave={this.handleViewPortLeave.bind(this)}>
                <div className="component-count">组件数:{this.state.count}</div>
                <Tree defaultExpendAll={true}>
                    <TreeElement info={this.state.pageInfo}
                                 key={this.state.renderKey}
                                 parent={null}
                                 ref="rootTreeElement"
                                 position={-1}/>
                </Tree>
                <TreeMoveBox/>
            </div>
        )
    }
}
