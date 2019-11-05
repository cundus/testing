import React from 'react';
import { Layout, Menu, Row, Col, Icon, Typography, Avatar } from 'antd';

import Logo from '../../../../assets/xl.png';
import Indonesia from '../../../../assets/indonesia-flag.png';

const { Text } = Typography;

const Header = (props) => {
  const { collapsed, toggle } = props;

  return (
    <Layout.Header
      style={{
      background: '#fff',
      padding: 0,
      position: 'fixed',
      left: 0, width: '100%',
      boxShadow: '0px 0px 40px 0px rgba(82, 63, 105, 0.1)',
      height: '80px',
      zIndex: '999'
      }}
    >
      <Row
        justify="space-between"
        type="flex"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-evenly'
        }}
      >
        <Col sm={12} xs={24}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{
              lineHeight: '64px',
              borderBottom: 'none'
            }}
          >
            <Icon
              style={{
                fontSize: 18,
                padding: '0 24px',
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
              type={collapsed ? 'align-right' : 'alignt-left'}
              onClick={toggle}
            />
            <Menu.Item key="2">Home</Menu.Item>
            <Menu.SubMenu
              key="1"
              title={
                <span className="submenu-title-wrapper">
                  Planning
                </span>
              }
            >
              <Menu.Item key="default">
              <Icon type="plus-circle" theme="filled" style={{ fontSize: '18px' }} />
                Create KPI
              </Menu.Item>
              <Menu.Item key="fluid">
                <Icon type="plus-circle" style={{ fontSize: '18px' }} />
                Create Non KPI
              </Menu.Item>
              <Menu.Item key="asaid">
                <Icon type="search" style={{ fontSize: '18px' }} />
                View My KPI
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="4">Monitoring</Menu.Item>
            <Menu.Item key="5">Appraisal</Menu.Item>
            <Menu.Item key="6">My Team</Menu.Item>
          </Menu>
        </Col>
        <Col sm={5} lg={5} xs={0} md={0}>
          <img src={Logo} alt="logo" />
        </Col>
        <Col sm={7} lg={5} xs={0} md={0}>
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              lineHeight: '64px',
              borderBottom: 'none'
            }}
          >
          <Row type="flex" justify="space-around" align="middle">
            <Menu.Item key="6">
              <Icon style={{ fontSize: 18 }} type="bell" />
            </Menu.Item>
            <Menu.Item key="7">
              <img src={Indonesia} alt="flag" style={{ borderRadius: '4px' }} />
            </Menu.Item>
            <Menu.Item key="8">
              <Text>Hi, John Doe</Text>
            </Menu.Item>
            <Menu.Item key="9">
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Menu.Item>
          </Row>
          </Menu>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header;