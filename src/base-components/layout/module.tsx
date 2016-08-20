export interface PropsInterface extends FitGaea.ComponentProps {

}

export class Props implements PropsInterface {
    name = '布局'
    icon = 'square-o'
    uniqueKey = 'gaea-layout'

    options = {
        width: {
            label: '宽',
            value: '100%',
            editor: 'text',
            editable: true,
            order: 0,
        },

        minHeight: {
            label: '最小高度',
            value: 80,
            editor: 'text',
            editable: true,
            order: 1
        },

        display: {
            label: '布局类型',
            value: 'flex',
            editor: 'none',
            editable: false,
            order: 2
        },

        justifyContent: {
            label: '主轴对齐方式',
            value: 'flex-start',
            editor: 'selector',
            editable: true,
            selector: [{
                key: 'flex-start',
                value: 'flex-start'
            }, {
                key: 'flex-end',
                value: 'flex-end'
            }, {
                key: 'center',
                value: 'center'
            }, {
                key: 'space-between',
                value: 'space-between'
            }, {
                key: 'space-around',
                value: 'space-around'
            }],
            order: 3
        },

        alignItems: {
            label: '交叉轴对齐方式',
            value: 'flex-start',
            editor: 'selector',
            editable: true,
            selector: [{
                key: 'flex-start',
                value: 'flex-start'
            }, {
                key: 'flex-end',
                value: 'flex-end'
            }, {
                key: 'center',
                value: 'center'
            }, {
                key: 'baseline',
                value: 'baseline'
            }, {
                key: 'stretch',
                value: 'stretch'
            }],
            order: 4
        },

        flexDirection: {
            label: '布局方向',
            value: 'row',
            editor: 'selector',
            editable: true,
            selector: [{
                key: 'row',
                value: 'row'
            }, {
                key: 'row-reverse',
                value: 'row-reverse'
            }, {
                key: 'column',
                value: 'column'
            }, {
                key: 'column-reverse',
                value: 'column-reverse'
            }],
            order: 5
        },

        flexWrap: {
            label: '排列方式',
            value: 'nowrap',
            editor: 'selector',
            editable: true,
            selector: [{
                key: 'nowrap',
                value: 'nowrap'
            }, {
                key: 'wrap',
                value: 'wrap'
            }, {
                key: 'wrap-reverse',
                value: 'wrap-reverse'
            }],
            order: 6
        },

        flexGrow: {
            label: 'flex-grow',
            value: null as any,
            editor: 'none',
            editable: false,
            order: 7
        },

        background: {
            label: '背景',
            value: 'white',
            editor: 'background',
            editable: true,
            order: 8
        },

        overflow: {
            label: 'overflow',
            value: 'hidden',
            editor: 'none',
            editable: false,
            order: 9
        },
    } as any
}

export interface StateInterface {

}

export class State implements StateInterface {

}