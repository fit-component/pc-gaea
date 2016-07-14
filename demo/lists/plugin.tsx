import * as React from 'react'
import { Link } from 'react-router'
import Button from 'fit-button'
import Gaea from '../../src'

class CustomButton extends React.Component<any, any> {
    render () {
        return (
            <Button>Button</Button>
        )
    }
}

class CustomLinkButton extends React.Component<any, any> {
    render () {
        return (
            <Link to="/"><Button>Jump</Button></Link>
        )
    }
}

const info = {
    plugin: {
        headerConfig: {
            right: {
                components: [CustomButton, CustomLinkButton],
                order: ['save', '$1', 'preview', 'redo', 'undo', '$2']
            },
            left: {
                components: [CustomButton],
                order: ['settings', '$1']
            }
        },
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
    }
}

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <Gaea {...info}/>
        )
    }
}