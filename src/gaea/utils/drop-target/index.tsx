import {DropTarget} from 'react-dnd'

export default (name: string, opts: any, callback: any) => {
    const func: any = () => {
        return DropTarget(name, opts, callback)
    }
    return func()
}