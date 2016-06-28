import * as React from 'react'
import {setHistoryComponentInstance} from '../../../object-store/history-component'
import {
    HistoryInfo,
    getHistorys,
    getNowHistoryIndex,
    jumpHistoryByIndex,
    getInitVersion,
    getVersions,
    Version,
    freshViewPort,
    getRootProps,
    loadMoreVersion
} from '../../../object-store/root-props'
import {Button, ButtonGroup} from '../../../../../../button/src'
import Timeago from '../../../../../../../common/timeago/src'
import * as _ from 'lodash'
import * as module from './module'
import * as classNames from 'classnames'
import PublishButton from './publish-button'
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

const switchTypes = [{
    type: 'version',
    name: '版本'
}, {
    type: 'operate',
    name: '操作'
}]

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

        this.setState({
            historys: getHistorys(),
            versions: getVersions(),
            nowIndex: getNowHistoryIndex()
        })
    }

    componentDidMount() {
        // 触发初始化获取版本列表
        getInitVersion()
    }

    componentWillUnmount() {
        this.isMount = false
    }

    /**
     * 添加操作记录
     */
    addHistory(historys: Array<HistoryInfo>, nowIndex: number) {
        if (!this.isMount)return

        this.setState({
            historys,
            nowIndex
        })
    }

    /**
     * 点击操作纪录
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

    /**
     * 选中了一个类型
     */
    handleChangeSelectedType(type: string) {
        this.setState({
            selectedType: type
        })
    }

    /**
     * 刷新版本信息列表 通过 save 触发的,不会改变 versionHasNext
     */
    freshVersionBySave(versions: Array<Version>) {
        if (!this.isMount)return

        this.setState({
            versions
        })
    }

    /**
     * 刷新版本信息列表 通过初始化或者加载更多触发的,会改变 versionHasNext
     */
    freshVersion(versions: Array<Version>, versionHasNext: boolean) {
        if (!this.isMount)return

        this.setState({
            versions,
            versionHasNext
        })
    }

    /**
     * 预览版本快照
     */
    handleVersionClick(info: any) {
        freshViewPort(info, '预览版本快照')
    }

    /**
     * 版本快照发布按钮被点击
     */
    handleVersionPublishClick() {

    }

    /**
     * 点击了加载更多
     */
    handleLoadMoreClick() {
        loadMoreVersion()
    }

    render() {
        // 组件类型选择按钮组
        const SwitchButtonGroup = switchTypes.map((item, index)=> {
            return (
                <Button type="secondary"
                        key={index}
                        onClick={this.handleChangeSelectedType.bind(this,item.type)}
                        active={item.type===this.state.selectedType}>{item.name}</Button>
            )
        })

        // 根据不同类型实例化对应组件
        let Components: any

        switch (this.state.selectedType) {
            case 'version':
                const versionsCopy = _.cloneDeep(this.state.versions)
                versionsCopy.reverse()

                let Versions = versionsCopy.map((item, index)=> {
                    const classes = classNames({
                        'version-item': true
                    })

                    return (
                        <div className={classes}
                             key={index}>
                            <div className="version-info-text">
                                <ButtonGroup>
                                    <Button size="sm"
                                            onClick={this.handleVersionClick.bind(this,item.info)}>预览</Button>
                                    {item.isPublished?
                                    <Button size="sm"
                                            type="info"
                                            disabled={item.isPublished}
                                            onClick={this.handleVersionPublishClick.bind(this)}>
                                        {item.publishCode}
                                    </Button>:
                                    <PublishButton id={item.id}/>
                                        }
                                </ButtonGroup>
                            </div>
                            <div className="version-time-text">
                                <Timeago date={item.date}
                                         label={timeagoChinese}
                                         formatter={timeagoFormatter}/>
                            </div>
                        </div>
                    )
                })

                Components = (
                    <div className="version-container">
                        {Versions}
                        {this.state.versionHasNext ?
                            <Button size="sm"
                                    onClick={this.handleLoadMoreClick.bind(this)}
                                    className="load-more">加载更多</Button>: null
                        }
                    </div>
                )
                break
            case 'operate':
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

                Components = (
                    <ButtonGroup vertical={true}>
                        {Historys}
                    </ButtonGroup>
                )
                break
        }

        return (
            <div className="_namespace history-container">
                <div className="container">
                    {Components}
                </div>
                <div className="switch">
                    <ButtonGroup className="button-group"
                                 vertical>{SwitchButtonGroup}</ButtonGroup>
                </div>
            </div>
        )
    }
}