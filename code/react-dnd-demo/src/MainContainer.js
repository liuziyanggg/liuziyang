import React, { Component } from 'react';
import './index.css'
import { DropTarget } from 'react-dnd'
import { DRAG_TYPE } from './constant'

const dropTarget = {
  drop (props, monitor, component) {
    return {
      didDrop: true
    }
  },
  canDrop (props, monitor) {
    const item = monitor.getItem()
    if (item.name.indexOf('菜单1') > -1) {
      return false
    } else {
      return true
    }
  }
}

class MainContainer extends Component {

  render () {

    const { connectDropTarget } = this.props 
    return connectDropTarget && connectDropTarget(
      <div className="wrap">
        
      </div>
    )
  }
}

export default DropTarget(DRAG_TYPE, dropTarget, (connect, monitor) =>({
  connectDropTarget: connect.dropTarget()
}))(MainContainer)
