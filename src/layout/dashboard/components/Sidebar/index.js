import React from 'react';
import { Layout, Menu, Icon, Typography } from 'antd';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = (props) => {
  const { collapsed, toggle } = props;
  return (
    <Sider style={{ zIndex: 1, boxShadow: '0px 1px 9px -3px rgba(0, 0, 0, 0.75)' }} trigger={null} collapsible collapsedWidth={0} collapsed={collapsed}>
      <Menu
        style={{ width: 275, height: '100vh' }}
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
      >
        <div style={{ padding: 4, textAlign: 'right' }}>
          <Icon type="close" style={{ color: 'white', background: 'lightgray', padding: 4, borderRadius: 4 }} onClick={toggle} />
        </div>
          <Menu.Item key="1">
            <Icon type="setting" />
            Layout Builder
          </Menu.Item>
          <div style={{ padding: 24 }}>
            <Text><b>Components</b></Text>
          </div>
          <Menu.Item key="2">
            <Icon type="database" />
            Datatables
        </Menu.Item>
          <Menu.Item key="3">
            <Icon type="bulb" />
            Buttons
        </Menu.Item>
          <Menu.Item key="4">
            <Icon type="container" />
            Portlets
        </Menu.Item>
          <Menu.Item key="5">
            <Icon type="bg-colors" />
            Timeline
        </Menu.Item>
          <div style={{ padding: 24 }}>
            <Text><b>Page Elements</b></Text>
          </div>
          <Menu.Item key="6">
            <Icon type="code" />
            Widgetts
        </Menu.Item>
          <Menu.Item key="7">
            <Icon type="calendar" />
            Calenders
        </Menu.Item>
          <Menu.Item key="8">
            <Icon type="cloud" />
            Prising Tables
        </Menu.Item>
          <Menu.Item key="9">
            <Icon type="calendar" />
            Invoice
        </Menu.Item>
          <Menu.Item key="10">
            <Icon type="crown" />
            Custom Pages
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar;
