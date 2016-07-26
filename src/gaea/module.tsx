import * as React from 'react'
import {Version} from './object-store/root-props'
import {SourceFile} from './sidebar/tools/source/module'

export interface OnlineVersion {
    key: string,
    value: string
}

export interface PropsInterface {
    /**
     * 导航栏标题
     */
    title?: string

    /**
     * 当前最新版本号,如果没有,默认是 0.0.0
     * 必须是 x.x.x 格式
     */
    version?: string

    /**
     * 外部提供编辑组件
     */
    components?: any[]

    /**
     * 页面初始化信息
     */
    pageInfo?: any

    /**
     * 点击保存后会返回页面结构树信息
     * info.saveToVersion() 被执行后,本地会在顶部新增一个版本信息
     * 同时要后端把 info.pageInfo 和当前时间戳 存储起来,下次刷新时候获取,并且塞入到 versionInit 可以显示版本快照信息
     */
    onSave?: (info?: any)=>void

    /**
     * 工具栏:是否只显示定制组件
     */
    toolsOnlyCustomComponents?: boolean

    /**
     * 第一次切换到版本记录页,填充版本纪录,每条记录格式如下:
     * info: 与 onSave 的 info.pageInfo 相同,表示这个快照的内容
     * date: javascript 的 Date 时间戳,表示当前修改的时间
     */
    versionInit?: (saveVersion?: (versions?: Array<Version>)=>void, hasNext?: boolean)=>void

    /**
     * 插件配置选项
     */
    plugin?: PluginInfo

    /**
     * 点击版本记录页的加载更多按钮,加载到哪和加载逻辑需要在业务中处理
     */
    onLoadMoreVersionClick?: (saveVersion?: (versions?: Array<Version>)=>void, hasNext?: boolean)=>void

    /**
     * 点击版本发布按钮
     * 执行回调会打一个新版本号,注意当服务器保存成功时再调用
     */
    onPublish?: (id?: string, version?: string, remarks?: string, save?: Function)=>void

    /**
     * 当上线被点击后,上线浮层弹出时候的回调
     * 此时可以通讯服务器,获取所有已发布的版本信息,作为传参执行回调函数,这样版本信息选择里变有值了
     */
    onOnlineModalShow?: (callback: (lists: Array<OnlineVersion>)=>void)=>void

    /**
     * 当确认上线按钮被点击
     */
    onOnlineClick?: (key: string|number)=>void

    /**
     * 资源 tab 获取内容时的回调
     */
    getSourceFileList?: (folderId: string, callback: (lists: Array<SourceFile>)=>void)=>void

    /**
     * 资源 tab 新增一个文件/文件夹
     */
    addSourceFile?: (folderId?: string, fileInfo?: SourceFile, addSuccess?: ()=>void)=>void

    /**
     * 页面大小, 0 ~ 100, 100 表示页面宽度最大
     */
    viewportSize?: number

    [x: string]: any
}

export class Props implements PropsInterface {
    title = 'Gaea'
    version = '0.0.0'
    components = [] as any
    toolsOnlyCustomComponents = false
    viewportSize = 100
    plugin = {
        left: {},
        right: {}
    }
    onSave = ()=> {
    }
    versionInit = (saveVersion: Function)=> {
        saveVersion([] as any, false)
    }
    onOnlineModalShow = (callback: any)=> {
        callback([] as any)
    }
    onOnlineClick = (key: string|number)=> {

    }
    onLoadMoreVersionClick = ()=> {
    }
    onPublish = ()=> {
    }
    getSourceFileList = (folderId: string, callback: (lists: Array<SourceFile>)=>void)=> {
        // get fileList by folderId
        const fileList: Array<SourceFile> = [] as any
        // run callback
        callback(fileList)
    }
    addSourceFile = (folderId?: string, fileInfo?: SourceFile, addSuccess?: ()=>void)=> {
        addSuccess()
    }
}

export interface StateInterface {
    /**
     * 是否在预览模式
     */
    isPreview?: boolean
}

export class State implements StateInterface {
    isPreview = false
}

export interface PluginInfo {
    headerConfig?: {
        left?: {
            components: React.ComponentClass<any>[],
            order: string[]
        },
        right?: {
            components: React.ComponentClass<any>[],
            order: string[]
        }
    },
    extendConfig?: {
        component: React.ComponentClass<any>
    }
}