//@flow

import React, { Component } from 'react'
import { _operators, DRAG_TYPE } from './constant'
import { Collapse } from 'antd'
import { DragSource } from 'react-dnd'

const Panel = Collapse.Panel

const PanelTitle = props => {
  const { name } = props
  return (
    <div className="pan-title"><span>{name}</span></div>
  )
}

const dragSource = {
  beginDrag(props, monitor, component) {
    return JSON.parse(JSON.stringify(props))
  },
  endDrag (props, monitor, component) {
    const didDrop = monitor.didDrop()
    const result = monitor.getDropResult()
    console.log(result)
    if (didDrop) {
      alert('拖拽完成')
    } else {
      alert('拖拽失败')
    }
  }
}

const CustomPanelItem = props => {
  const {connectDragSource, name } = props
  return connectDragSource(
    <div className="panel-child-item" >{name}</div>
  )
}
const CustomPanel = DragSource(DRAG_TYPE, dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource()
}))(CustomPanelItem)

export default class LeftSider extends Component {

  render () {
    return (
      <Collapse accordion>
        {
          _operators.map((menu, index) => (
            <Panel header={<PanelTitle name={menu.name} icon={menu.icon}/>}  key={index} >
              {
                menu.children.map((c, ci) => <CustomPanel name={c.name} key={ci} {...c} />)
              }
            </Panel>
          ))
        }
      </Collapse>
    )
  }
}
