import {DragSource} from 'react-dnd'

export interface DropTargetOptions {
    arePropsEqual?: (object1?: any, object2?: any) => boolean
}

export default (name: string, spec: any, callback: any, options?: DropTargetOptions) => {
    const func: any = () => {
        return DragSource(name, spec, callback, options)
    }
    return func()
}