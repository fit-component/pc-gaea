import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as $ from 'jquery'
import TreeElement from './tree-element'
import connect from '../../utils/connect'
import * as rootProps from '../../object-store/root-props'
import {Tree} from '../../../../../tree/src'
import * as actions from '../../stores/actions'
import {setDomTree, setDomTreePosition, set$domTree} from '../../object-store/dom-tree'
import TreeMoveBox from './tree-move-box'
import './index.scss'

@connect(
    (state: any) => {
        return {
            rootPropsStore: state.rootProps.toJS()
        }
    },
    actions
)
export default class DomTree extends React.Component <any ,any> {
    refs: any
    state: any = {
        count: 0
    }
    private $dom: JQuery

    componentWillMount() {
        setDomTree(this)
        this.setCount(rootProps.getCount())
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
        set$domTree(this.$dom)
        // 等待单页加载完毕
        setTimeout(()=> {
            this.setDomTreePosition()
        }, 100)

        // 处理 resize 的情况
        $(window).resize(()=> {
            this.setDomTreePosition()
        })
    }

    setDomTreePosition() {
        setDomTreePosition({
            left: this.$dom.offset().left,
            top: this.$dom.offset().top
        })
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (_.isEqual(this.props['rootPropsStore'], nextProps['rootPropsStore']) && this.state === nextState) {
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
        this.props['outMoveBoxClose']()
        this.props['treeMoveBoxClose']()
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

    render() {
        const rootPropsJs = rootProps.getRootProps().toJS()

        return (
            <div className="_namespace"
                 onMouseLeave={this.handleViewPortLeave.bind(this)}>
                <div className="component-count">组件数:{this.state.count}</div>
                <Tree defaultExpendAll={true}>
                    <TreeElement info={rootPropsJs.pageInfo}
                                 parent={null}
                                 ref="rootTreeElement"
                                 position={-1}/>
                </Tree>
                <TreeMoveBox/>
            </div>
        )
    }
}
