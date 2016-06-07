import {EditProps} from '../edit-option'

export interface PropsInterface extends EditProps {
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
    }
}

export interface StateInterface {

}

export class State implements StateInterface {

}