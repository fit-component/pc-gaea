/**
 * 将 layout 样式处理成适合包裹一层的
 */

import * as React from 'react'

export default (options: {
    [key: string]: FitGaea.ComponentPropsOptions
}) => {
    let outerStyle: React.CSSProperties = {}

    outerStyle.width = options['width'].value
    outerStyle.minHeight = options['minHeight'].value
    outerStyle.display = options['display'].value
    outerStyle.flexDirection = options['flexDirection'].value

    // 如果宽高是百分比,那继承的是100%,否则长度会更小
    if (options['width'].value && options['width'].value.toString().indexOf('%') > -1) {
        options['width'].value = '100%'
    }
    if (options['minHeight'].value && options['minHeight'].value.toString().indexOf('%') > -1) {
        options['minHeight'].value = '100%'
    }

    return outerStyle
}