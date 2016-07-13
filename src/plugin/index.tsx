import * as React from 'react'
import {PluginInfo} from '../gaea/module.tsx'
import { ContextComponentClass } from './module.tsx'

function getDisplayName(WrapperComponent:any) {
    return WrapperComponent.displayName || WrapperComponent.name || 'Component'
}


export default function PluginContext<P>(
    pluginInfo:PluginInfo
):(wrapperComponent:React.ComponentClass<P>) => ContextComponentClass<P> {

    let childContext = {
        pluginInfo: pluginInfo
    };

    return function (wrapperComponent:React.ComponentClass<P>):ContextComponentClass<P> {

        return class extends React.Component<P, any> {
            static displayName = `Plugin(${getDisplayName(wrapperComponent)})`;

            static childContextTypes:React.ValidationMap<any> = {
                pluginInfo: React.PropTypes.object.isRequired
            };

            getChildContext() {
                return childContext
            }

            render() {
                return React.createElement(
                    wrapperComponent,
                    this.props
                );
            }
        }
    }
}