import * as React from 'react'
import * as module from './module'
import './index.scss'

export default class SwitchSize extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    handleClick(size: number) {
        this.props.setPaddingSize(size)
    }

    render() {
        const largestStyle = {
            left: 0,
            width: '100%'
        }

        const largeStyle = {
            left: '10%',
            width: '80%'
        }

        const normalStyle = {
            left: '20%',
            width: '60%'
        }

        const smallStyle = {
            left: '30%',
            width: '40%'
        }

        return (
            <div className="_namespace">
                <div className="view-box largest"
                     style={largestStyle}
                     onClick={this.handleClick.bind(this,0)}></div>
                <div className="view-box large"
                     style={largeStyle}
                     onClick={this.handleClick.bind(this,10)}></div>
                <div className="view-box normal"
                     style={normalStyle}
                     onClick={this.handleClick.bind(this,20)}></div>
                <div className="view-box small"
                     style={smallStyle}
                     onClick={this.handleClick.bind(this,30)}></div>
            </div>
        )
    }
}