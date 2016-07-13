import * as React from 'react'

export interface PropInterface {
  /**
   * 外部提供的扩展组件
   */
  components?: Array<React.Component<any, any>> | React.Component<any, any>

  /**
   * 配置信息
   */
  componentInfo?: any

}

export class Props implements PropInterface {

}

export interface StateInterface {

}

export class State implements StateInterface {

}