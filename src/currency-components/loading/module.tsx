import {EditProps} from '../edit-option'

export interface PropsInterface extends EditProps {
}

export class Props implements PropsInterface {
    name = '载入动画'
    icon = 'circle-o-notch'
    uniqueKey = 'gaea-loading'
    options = {}
}

export interface StateInterface {

}

export class State implements StateInterface {

}