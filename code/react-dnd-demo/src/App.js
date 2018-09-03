import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Layout } from 'antd'
import LeftSider from './LeftSider'
import './index.css'
import MainContainer from './MainContainer'


const { Sider, Content } = Layout

class App extends Component {

  render() {
    return (
      <Layout className="main">
          <Sider className="left-sider" >
            <LeftSider />
          </Sider>
          <Content>
            <MainContainer>
            </MainContainer>
          </Content>
      </Layout>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
