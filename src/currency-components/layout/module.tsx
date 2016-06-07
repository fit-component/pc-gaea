import {EditProps} from '../../currency-components/edit-option'

export interface PropsInterface extends EditProps {
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
            editable: true
        },
        minHeight: {
            label: '最小高度',
            value: 50,
            editor: 'text',
            editable: true
        },
        display: {
            label: '布局类型',
            value: 'flex',
            editor: 'none',
            editable: false
        },
        flexDirection: {
            label: '布局方向',
            value: 'row',
            editor: 'none',
            editable: false
        },
        flexGrow: {
            label: 'flex-grow',
            value: null as any,
            editor: 'none',
            editable: false
        },
        background: {
            label: '背景',
            value: 'white',
            editor: 'background',
            editable: true
        }
    }
}

export interface StateInterface {

}

export class State implements StateInterface {

}