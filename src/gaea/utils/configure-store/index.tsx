/// <reference path="../../../../../../../typings-module/process.d.ts" />
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../../stores/reducers'
import * as process from 'process'

// 定义ts丢失的属性
interface MyWindow extends Window {
    devToolsExtension: any
}
declare const window: MyWindow

interface MyModule {
    hot: any
}
declare const module: MyModule

declare const require: any

// 中间件生成器
const middlewareBuilder = () => {
    let middleware: any = {}
    let universalMiddleware: any = []
    let allComposeElements: any = []

    if (process.browser) {
        middleware = applyMiddleware(...universalMiddleware)
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
            allComposeElements = [
                middleware
            ]
        } else {
            allComposeElements = [
                middleware,
                window.devToolsExtension ? window.devToolsExtension() : (f: any) => f
            ]
        }
    } else {
        middleware = applyMiddleware(...universalMiddleware);
        allComposeElements = [
            middleware
        ]
    }

    return allComposeElements
}

const finalCreateStore = compose(...middlewareBuilder())(createStore)

const configureStore = (initialState?: any, rootReducer?: any) => {
    const store = finalCreateStore(rootReducer, initialState)

    if (module.hot) {
        // 开启 reducer 的 hot-loader
        // module.hot.accept('../reducer', () => {
        //     const nextRootReducer = require('../reducer').default
        //     store.replaceReducer(nextRootReducer)
        // })
    }

    return store
}

const store = configureStore({}, reducer)
export default store