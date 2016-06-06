import {DragSource} from 'react-dnd'

export default (name: string, opts: any, callback: any) => {
    const func: any = () => {
        return DragSource(name, opts, callback)
    }
    return func()
}