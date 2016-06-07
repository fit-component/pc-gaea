import {EditProps} from '../edit-option'

export interface PropsInterface extends EditProps {
}

export class Props implements PropsInterface {
    name = '按钮'
    icon = 'square-o'
    uniqueKey = 'gaea-button'

    options = {
        text: {
            label: '文字',
            value: '按钮',
            editor: 'text',
            editable: true
        }
    }
}

export interface StateInterface {

}

export class State implements StateInterface {

}