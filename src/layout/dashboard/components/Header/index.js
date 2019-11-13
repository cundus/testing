import React from 'react';
import { Layout, Menu, Row, Col, Icon, Typography, Avatar } from 'antd';
import  {Link}  from 'react-router-dom';
import Logo from '../../../../assets/xl.png';
import Indonesia from '../../../../assets/indonesia-flag.png';
import "./header-styles.scss";

const { Text } = Typography;

const Header = (props) => {
  const { collapsed, toggle } = props;

  return (
    <Layout.Header
      className="headerContainer"
    >
      <Row
        justify="space-between"
        type="flex"
        className="headerWrapper"
      >
        <Col lg={10} sm={10} xs={24}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            className="menuWrapper"
          >
            <Icon
              className="drawerIcon"
              type={collapsed ? 'align-right' : 'alignt-left'}
              onClick={toggle}
            />
            <Menu.Item key="2">
              <Link to='/'>
                Home
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              key="1"
              title={
                <span className="submenu-title-wrapper">
                  Planning
                </span>
              }
            >
            <Menu.Item key="default">
              <Link to='/planing'>
              <Icon type="plus-circle" theme="filled" className="dropdownItem" />
                Create KPI
                </Link>
              </Menu.Item>
              <Menu.Item key="fluid">
                <Icon type="plus-circle" className="dropdownItem" />
                Create Non KPI
              </Menu.Item>
              <Menu.Item key="asaid">
                <Icon type="search" className="dropdownItem" />
                View My KPI
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="4">Monitoring</Menu.Item>
            <Menu.Item key="5">Appraisal</Menu.Item>
            <Menu.Item key="6">My Team</Menu.Item>
          </Menu>
        </Col>
        <Col lg={8} sm={5} xs={0} md={0}>
          <img src={Logo} alt="logo" />
        </Col>
        <Col lg={6} sm={5} xs={0} md={0}>
          <Menu
            theme="light"
            mode="horizontal"
            className="menuWrapper"
          >
          <Row type="flex" justify="space-around" align="middle">
            <Menu.Item key="6">
              <Icon style={{ fontSize: 18 }} type="bell" />
            </Menu.Item>
            <Menu.Item key="7">
              <img src={Indonesia} alt="flag" className="flagIcon" />
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