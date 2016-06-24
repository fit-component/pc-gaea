import * as React from 'react'
import {setHistoryComponentInstance} from '../../../object-store/history-component'
import {
    HistoryInfo,
    getHistorys,
    getNowHistoryIndex,
    setRootPropsPageInfo,
    setNowHistoryIndex,
    jumpHistoryByIndex
} from '../../../object-store/root-props'
import {getViewPort} from '../../../object-store/view-port'
import {getDomTree} from '../../../object-store/dom-tree'
import {Button, ButtonGroup} from '../../../../../../button/src'
import Timeago from '../../../../../../../common/timeago/src'
import * as _ from 'lodash'
import * as module from './module'
import * as classNames from 'classnames'
import './index.scss'

const timeagoChinese: any = {
    ago: '之前',
    fromNow: '从现在开始',
    second: '秒',
    minute: '分钟',
    hour: '小时',
    day: '天',
    week: '周',
    month: '月',
    year: '年'
}

const timeagoFormatter = (value: number, unit: string, suffix: string)=> {
    return value + ' ' + unit + ' ' + suffix
}

export default class HistoryComponent extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    /**
     * 随着 tab 的切换,可能会被销毁数次
     */
    private isMount: boolean

    componentWillMount() {
        this.isMount = true
        setHistoryComponentInstance(this)
        const historys = getHistorys()
        const historyIndex = getNowHistoryIndex()
        this.setState({
            historys: historys,
            nowIndex: historyIndex
        })
    }

    componentWillUnmount() {
        this.isMount = false
    }

    addHistory(historys: Array<HistoryInfo>, nowIndex: number) {
        if (!this.isMount)return

        this.setState({
            historys,
            nowIndex
        })
    }

    /**
     * 点击历史纪录
     */
    handleItemClick(index: number) {
        this.jumpHistoryByIndex(index)
    }

    /**
     * 【可能被外部调用】跳转到某一个历史节点
     * 自身可能会被销毁 调用 setState 之前要做判断
     */
    jumpHistoryByIndex(index: number) {
        jumpHistoryByIndex(index)

        if (this.isMount) {
            this.setState({
                nowIndex: index
            })
        }
    }

    render() {
        const historysCopy = _.cloneDeep(this.state.historys)
        historysCopy.reverse()

        let Historys = historysCopy.map((item, index)=> {
            const classes = classNames({
                'history-item': true,
                'active': index === this.state.historys.length - 1 - this.state.nowIndex
            })

            return (
                <Button className={classes}
                        onClick={this.handleItemClick.bind(this,this.state.historys.length - 1- index)}
                        key={index}>
                    <div className="info-text">
                        {item.operateName}
                    </div>
                    <div className="time-text">
                        <Timeago date={item.date}
                                 label={timeagoChinese}
                                 formatter={timeagoFormatter}/>
                    </div>
                </Button>
            )
        })

        return (
            <ButtonGroup vertical={true}
                         className="_namespace">
                {Historys}
            </ButtonGroup>
        )
    }
}