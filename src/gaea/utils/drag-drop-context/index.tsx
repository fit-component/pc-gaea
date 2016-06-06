import {DragDropContext} from 'react-dnd'

export default (props: any) => {
    const func: any = () => {
        return DragDropContext(props)
    }
    return func()
}