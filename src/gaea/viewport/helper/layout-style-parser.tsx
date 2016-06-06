import * as _ from 'lodash'

export default (layoutMergedProps: any)=> {
    const defaultMergeStyle = {
        width: layoutMergedProps['options']['width'].value,
        minHeight: layoutMergedProps['options']['minHeight'].value,
        display: layoutMergedProps['options']['display'].value,
        flexDirection: layoutMergedProps['options']['flexDirection'].value,
        flexGrow: layoutMergedProps['options']['flexGrow'].value
    }
    let layoutDragSourceStyle: any = _.cloneDeep(defaultMergeStyle)
    let layoutDragTargetStyle: any = _.cloneDeep(defaultMergeStyle)

    /**
     * 如果宽高是百分比,那继承的是100%,否则长度会更小
     * 对于 layout 组件,dragSource > dragTarget > layout
     */
    // 把 dragTarget layout 的宽高都调整到100%,只有 dragSource 的宽高属性是正常的,能确保显示正确
    if (layoutDragTargetStyle.width && layoutDragTargetStyle.width.toString().indexOf('%') > -1) {
        layoutDragTargetStyle.width = '100%'
        layoutMergedProps['options']['width'].value = '100%'
    }
    if (layoutDragTargetStyle.minHeight && layoutDragTargetStyle.minHeight.toString().indexOf('%') > -1) {
        layoutDragTargetStyle.minHeight = '100%'
        layoutMergedProps['options']['minHeight'].value = '100%'
    }

    return {
        layoutMergedProps,
        layoutDragTargetStyle,
        layoutDragSourceStyle
    }
}