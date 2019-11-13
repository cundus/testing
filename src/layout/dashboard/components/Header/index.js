import React from "react";
import { Layout, Menu, Row, Col, Icon, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/xl.png";
import Indonesia from "../../../../assets/flags/004-indonesia.svg";
import myAvatar from "../../../../assets/users/300_23.jpg";
import "./header-styles.scss";
import "antd/dist/antd.css";

const { Text } = Typography;

const Header = props => {
  const { collapsed, toggle } = props;

  return (
    <Layout.Header className="headerContainer">
      <Row justify="space-between" type="flex" className="headerWrapper">
        <Col xs={0} sm={0} md={0} lg={10}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            className="menuWrapper"
          >
            {/* <Icon
              className="drawerIcon"
              type={collapsed ? 'align-right' : 'alignt-left'}
              onClick={toggle}
            /> */}
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.SubMenu
              key="1"
              title={<span className="submenu-title-wrapper">Planning</span>}
            >
              <Menu.Item key="default">
                <Link to="/planing">
                  <Icon
                    type="plus-circle"
                    theme="filled"
                    className="dropdownItem"
                  />
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
            <Menu.Item key="2">Monitoring</Menu.Item>
            <Menu.Item key="3">Appraisal</Menu.Item>
            <Menu.Item key="4">My Team</Menu.Item>
          </Menu>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8}>
          <img src={Logo} alt="logo" />
        </Col>
        <Col xs={0} sm={0} md={0} lg={4}>
          <Menu theme="light" mode="horizontal" className="menuWrapper">
            <Row type="flex" justify="space-between" align="middle">
              <Menu.Item key="5">
                <Icon style={{ fontSize: 18 }} type="bell" />
              </Menu.Item>
              <Menu.Item key="6">
                <img src={Indonesia} alt="flag" className="flagIcon" />
              </Menu.Item>
              <Menu.Item key="7" className="accountWrapper">
                <Text>Hi, John Doe</Text>
                <Avatar
                  shape="square"
                  size="large"
                  src={myAvatar}
                  className="avatar"
                />
              </Menu.Item>
            </Row>
          </Menu>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
