 import * as React from 'react'
import { Link } from 'react-router'
import Input from 'fit-input'
import Gaea from '../../src'

interface extendComponentProps {
    onChange: (key: string, value:any) => {}
}

class extendComponent extends React.Component<extendComponentProps, any> {
    handleChange (event: React.FormEvent) {
        let targetElement:any = event.target;
        this.props.onChange('firstText', targetElement.value);
    }

    render () {
        return (
            <div className="_namespace">
                <Input label="第一段文字" onChange={this.handleChange.bind(this)} />
            </div>
        )
    }
}

const info = {
    plugin: {
        extendConfig: {
            component: extendComponent
        }
    },
    pageInfo: {
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
    },
    onSave: (info:any) => {
        console.log(info);
    }
}

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <Gaea {...info}/>
        )
    }
}