import React from 'react';
import {
  Layout, Menu, Row, Col, Icon, Typography, Avatar, Dropdown
} from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Logo from '../../../../assets/xl.png';
import Indonesia from '../../../../assets/flags/004-indonesia.svg';
import MenuList from '../../../../routes/MenuList';
import { accountMenu, langMenu, notifMenu } from './components/menus';
import styles from './Header.styles';


const { Text } = Typography;
const { REACT_APP_API_URL } = process.env;

const Header = (props) => {
  const {
    collapsed, toggle, history, isAllowToMonitor, logout
  } = props;
  let mainRouter = MenuList.filter((x) => x.menuLevel === 1);
  const pathlocation = history.location.pathname;
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const uId = _.get(props, 'user.result.user.userId', '');
  const url = uId && `${REACT_APP_API_URL}/user/photo/${uId}`;
  const name = _.get(props, 'user.result.user.firstName', '');
  const isManager = _.get(props, 'user.result.user.manager', false);
  if (isManager === false) {
    mainRouter = mainRouter.filter((d) => d.title !== 'My Team');
  }
  return (
    <Layout.Header className="headerContainer">
      <Row justify="space-between" type="flex" className="headerWrapper">
        <Col xs={1} sm={1} md={1} lg={0}>
          <Icon
            className="drawerIcon"
            type={collapsed ? 'align-right' : 'alignt-left'}
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
            {mainRouter.map((menu) => {
              // check is has child
              const childsRoutes = MenuList.filter((menuChild) => menuChild.parent === menu.title);
              if (childsRoutes.length === 0) {
                const isDisabled = isAllowToMonitor && (menu.title === 'Monitoring' || menu.title === 'Appraisal');
                return (
                  <Menu.Item
                    key={`${menu.path}`}
                    disabled={isDisabled}
                  >
                    <Link to={menu.path}>{menu.title}</Link>
                  </Menu.Item>
                );
              } else {
                return (
                  <Menu.SubMenu
                    key={`${menu.name}-${menu.id}`}
                    title={
                      <span className="submenu-title-wrapper">
                        {menu.title}
                      </span>
                    }
                  >
                    {childsRoutes.map((menuChild) => {
                      const isDisabled = isAllowToMonitor &&
                      (menu.title === 'Monitoring' || menu.title === 'Appraisal');
                      return (
                        <Menu.Item
                          key={`${menuChild.path}`}
                          disabled={isDisabled}
                        >
                          <Link to={menuChild.path}>
                            <Icon
                              type={`${menuChild.icon}`}
                              theme={`${menuChild.theme}`}
                              className="dropdownItem"
                            />
                            {menuChild.title}
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
            <img
              src={Logo}
              alt="logo"
              style={isDesktopOrLaptop ? {} : styles.logo}
            />
          </Link>
        </Col>
        <Col xs={8} sm={8} md={8} lg={4}>
          <Row type="flex" justify="space-between" align="middle">
            <Dropdown overlay={notifMenu} trigger={['hover', 'click']} placement="bottomCenter">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a id="account-link" href="#">
                <Icon style={{ fontSize: 18 }} type="bell" />
              </a>
            </Dropdown>
            <Dropdown overlay={langMenu} placement="bottomCenter">
              <img src={Indonesia} alt="flag" className="flagIcon" />
            </Dropdown>
            <Dropdown trigger={['hover', 'click']} overlay={accountMenu(logout)} placement="bottomLeft">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a id="account-link" href="#">
                <div className="accountWrapper">
                  {isDesktopOrLaptop && <Text>{name && `Hi, ${name}`}</Text>}
                  <Avatar
                    shape="square"
                    size={isDesktopOrLaptop ? 'large' : 'default'}
                    src={url}
                    icon="user"
                    className="avatar"
                  />
                </div>
              </a>
            </Dropdown>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};


const mapStateToProps = (state) => ({
  auth: state.authReducer,
  user: state.userReducers,
  step: state.userKpiStateReducers
});
const connectToComponent = connect(mapStateToProps)(Header);


export default withRouter(connectToComponent);


Header.propTypes = {
  history: PropTypes.instanceOf(Object),
  collapsed: PropTypes.bool,
  toggle: PropTypes.func,
  isAllowToMonitor: PropTypes.bool,
  logout: PropTypes.func
};
