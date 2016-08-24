export interface PropsInterface extends FitGaea.ComponentProps {
}

export class Props implements PropsInterface {
    name = '选择框'
    uniqueKey = 'gaea-select'
    icon = 'list'

    options = {
        label: {
            label: '标题',
            value: '请输入',
            editor: 'text',
            editable: true
        },

        defaultValue: {
            label: '默认值',
            value: '',
            editor: 'text',
            editable: true
        },

        options: {
            label: '配置',
            editor: 'array',
            editable: true,
            array: [{
                key: 'key',
                label: 'KEY',
                editor: 'text',
                editable: true
            }, {
                key: 'value',
                label: 'VALUE',
                editor: 'text',
                editable: true
            }],
            value: []
        }
    } as any
}

export interface StateInterface {

}

export class State implements StateInterface {

}