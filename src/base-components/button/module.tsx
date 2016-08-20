export interface PropsInterface extends FitGaea.ComponentProps {
}

export class Props implements PropsInterface {
    public name = '按钮'
    public icon = 'square-o'
    public uniqueKey = 'gaea-button'

    options = {
        text: {
            label: '文字',
            value: '按钮',
            editor: 'text',
            editable: true
        }
    } as any
}

export interface StateInterface {

}

export class State implements StateInterface {

}