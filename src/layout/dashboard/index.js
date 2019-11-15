import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";

import { Footer, Header, Sidebar } from "./components";

const { Content } = Layout;

class Dashboard extends React.Component {
  state = {
    collapsed: true
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  
  render() {
    const { collapsed } = this.state;

    return (

      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar
          collapsed={collapsed}
          toggle={this.toggle}
        />
        <Layout style={{ opacity: !collapsed ? '0.3' : '1' }}>
          <Header
            collapsed={collapsed}
            toggle={this.toggle}
          />
          <Content style={{ margin: '100px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                {this.props.children}
              </div>
            </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
