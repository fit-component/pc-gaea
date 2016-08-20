declare namespace FitGaea {
    /**
     * 操作组件产生的 diff
     */
    export interface Diff {
        // 操作类型
        type: 'add' | 'move' | 'remove' | 'exchange' | 'update' | 'paste'
        // 操作组件的 mapUniqueKey
        mapUniqueKey: string
        // 新增操作
        add?: {
            // 新增组件的唯一标识 id
            uniqueId: string
            // 父级 mapKey
            parentMapUniqueKey: string
            // 插入的位置
            index: number
        }
        // 移动到另一个父元素
        move?: {
            // 移动到的父级 mapKey
            targetParentMapUniqueKey: string
            // 移动前父级 mapKey
            sourceParentMapUniqueKey: string
            // 插入的位置
            targetIndex: number
            // 移除的位置
            sourceIndex: number
        }
        // 删除组件
        remove?: DiffRemove
        // 内部交换顺序
        exchange?: {
            oldIndex: number
            newIndex: number
        }
        // 更新操作
        update?: {
            // 配置项 key
            optionKey: string
            oldValue: ComponentPropsOptionValue,
            newValue: ComponentPropsOptionValue
        },
        // 粘贴操作
        paste?: DiffRemove
    }

    export interface DiffRemove extends ViewportComponentFullInfo {
        // 父级元素 mapKey
        parentMapUniqueKey: string
        // 删除的位置
        index: number
    }
}