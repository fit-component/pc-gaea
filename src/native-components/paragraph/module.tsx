export interface PropsInterface extends FitGaea.ComponentProps {
}

export class Props implements PropsInterface {
    name = '段落'
    icon = 'align-justify'
    uniqueKey = 'gaea-paragraph'

    options = {
        text: {
            label: '内容',
            value: '段落文字',
            editor: 'text',
            editable: true
        },

        fontSize: {
            label: '字体大小',
            value: 14,
            editor: 'text',
            editable: true
        }
    } as any
}

export interface StateInterface {

}

export class State implements StateInterface {

}