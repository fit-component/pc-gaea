import * as React from 'react'
import {Preview} from '../../src'

const info = {
    componentInfo: {
        component: 'gaea-layout',
        props: {
            name: '外壳',
            options: {
                width: {
                    value: '100%',
                    editable: false
                },
                flexGrow: {
                    value: 1,
                    editable: false
                },
                flexDirection: {
                    value: 'column'
                }
            }
        },
        childs: [{
            component: 'gaea-button'
        }]
    }
}

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <Preview {...info}/>
        )
    }
}