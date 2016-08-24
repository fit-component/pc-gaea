export interface PropsInterface extends FitGaea.ComponentProps {
}

export class Props implements PropsInterface {
    name = '输入框'
    uniqueKey = 'gaea-input'
    icon = 'font'

    options = {
        label: {
            label: '标题',
            value: '请输入',
            editor: 'text',
            editable: true
        }
    } as any
}

export interface StateInterface {

}

export class State implements StateInterface {

}