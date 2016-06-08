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

    componentWillMount() {
        setDomTree(this)
    }

    componentDidMount() {
        const $dom = $(ReactDOM.findDOMNode(this))
        set$domTree($dom)
        $(document).ready(()=> {
            setDomTreePosition({
                left: $dom.offset().left,
                top: $dom.offset().top
            })
        })

        // 处理 resize 的情况
        $(window).resize(()=> {
            setDomTreePosition({
                left: $dom.offset().left,
                top: $dom.offset().top
            })
        })
    }

    shouldComponentUpdate(nextProps: any) {
        if (_.isEqual(this.props['rootPropsStore'], nextProps['rootPropsStore'])) {
            return false
        }
        return true
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
