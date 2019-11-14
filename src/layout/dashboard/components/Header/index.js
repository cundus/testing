import React from "react";
import { Layout, Menu, Row, Col, Icon, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/xl.png";
import Indonesia from "../../../../assets/flags/004-indonesia.svg";
import myAvatar from "../../../../assets/users/300_23.jpg";
import "./header-styles.scss";
import { useMediaQuery } from "react-responsive";
import Router from "../../../../Router";
const { Text } = Typography;

const Header = props => {
  const mainRouter = Router.filter(x => x.menuLevel === 1);
  const pathlocation = window.location.pathname;
  const { collapsed, toggle } = props;
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });

  return (
    <Layout.Header className="headerContainer">
      <Row justify="space-between" type="flex" className="headerWrapper">
        <Col xs={1} sm={1} md={1} lg={0}>
          <Icon
            className="drawerIcon"
            type={collapsed ? "align-right" : "alignt-left"}
            onClick={toggle}
          />
        </Col>
        <Col xs={0} sm={0} md={0} lg={10}>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[pathlocation]}
            className="menuWrapper"
          >
            {mainRouter.map((r, i) => {
              // check is has child
              const childsRoutes = Router.filter(rc => rc.parent === r.name);
              if (childsRoutes.length === 0) {
                return (
                  <Menu.Item key={`${r.path}`}>
                    <Link to={r.path}>{r.viewName}</Link>
                  </Menu.Item>
                );
              } else {
                return (
                  <Menu.SubMenu
                    key={`${r.name}-${i}`}
                    title={
                      <span className="submenu-title-wrapper">
                        {r.viewName}
                      </span>
                    }
                  >
                    {childsRoutes.map((rc, i) => {
                      return (
                        <Menu.Item key={`${rc.path}`}>
                          <Link to={rc.path}>
                            <Icon
                              type={`${rc.icon}`}
                              theme={`${rc.theme}`}
                              className="dropdownItem"
                            />
                            {rc.viewName}
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu.SubMenu>
                );
              }
            })}
          </Menu>
        </Col>
        <Col xs={10} sm={10} md={10} lg={8}>
          <Link to="/">
            <img src={Logo} alt="logo" style={isDesktopOrLaptop ? {} :{width:"auto", height:40}} />
          </Link>
        </Col>
        <Col xs={8} sm={8} md={8} lg={4}>
          <Menu theme="light" mode="horizontal" className="menuWrapper">
            <Row type="flex" justify="space-between" align="middle">
              <Menu.Item key="5">
                <Icon style={{ fontSize: 18 }} type="bell" />
              </Menu.Item>
              <Menu.Item key="6">
                <img src={Indonesia} alt="flag" className="flagIcon" />
              </Menu.Item>
              <Menu.Item key="7" className="accountWrapper">
                {isDesktopOrLaptop && <Text>Hi, John Doe</Text>}
                <Avatar
                  shape="square"
                  size={isDesktopOrLaptop ? "large" : "default"}
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
