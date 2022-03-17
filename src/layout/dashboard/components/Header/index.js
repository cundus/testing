import React from 'react';
import {
  Layout, Menu, Row, Col, Icon, Typography, Avatar, Dropdown, Badge
} from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import Logo from '../../../../assets/xl.png';
import Indonesia from '../../../../assets/flags/004-indonesia.svg';
import MenuList from '../../../../routes/MenuList';
import { accountMenu, notifMenu } from './components/menus';
import styles from './Header.styles';
import apiUrl from '../../../../utils/apiUrl';


const { Text } = Typography;

const Header = (props) => {
  const {
    collapsed, toggle, history, isMonitoring, isAppraisal, logout, notificationReducer, authReducer
  } = props;
  let mainRouter = MenuList.filter((x) => x.menuLevel === 1);
  const pathlocation = history.location.pathname;
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const uId = authReducer?.userId;
  const url = uId && `${apiUrl()}/user/photo/${uId}`;
  const name = authReducer?.firstName;
  const fullName = String(authReducer?.firstName || "") + " " + String(authReducer?.lastName || "");
  const isManager = authReducer?.manager;
  if (!isManager) {
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
        <Col xs={10} sm={10} md={4} lg={4}>
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              style={isDesktopOrLaptop ? {} : styles.logo}
            />
          </Link>
        </Col>
        <Col xs={0} sm={0} md={6} lg={13} style={{marginLeft: -30}}>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[pathlocation]}
            className="menuWrapper"
          >
            {mainRouter.map((menu) => {
              const childsRoutes = MenuList.filter((menuChild) => menuChild.parent === menu.title);
              if (childsRoutes.length === 0) {
                const isMonDisabled = !isMonitoring && (menu.title === 'Monitoring')
                const isApDisabled = !isAppraisal && (menu.title === 'Appraisal')
                const isOnBehalfHide = !authReducer?.administrator && (menu.title === 'On Behalf')
                if (isOnBehalfHide) {
                  return null
                }
                return (
                  <Menu.Item
                    key={`${menu.path}`}
                    disabled={isMonDisabled || isApDisabled}
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
                    {childsRoutes?.filter((item) => item?.manager === isManager || item?.employee)?.map((menuChild) => {
                      const isMonDisabled = !isMonitoring && (menu.title === 'Monitoring')
                      const isApDisabled = !isAppraisal && (menu.title === 'Appraisal')
                      return (
                        <Menu.Item
                          key={`${menuChild.path}`}
                          disabled={isMonDisabled || isApDisabled}
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
        <Col xs={8} sm={8} md={8} lg={4}>
          <Row type="flex" justify="space-between" align="middle">
            <Dropdown
              overlay={notifMenu(notificationReducer.data, uId)}
              trigger={['hover', 'click']}
              placement="bottomCenter"
            >
                <div style={{cursor: 'pointer'}}>
                  <Badge count={notificationReducer.data.length} overflowCount={20}>
                    <Icon style={{ fontSize: 18 }} type="bell" />
                  </Badge>
                </div>
            </Dropdown>
            <img src={Indonesia} alt="flag" className="flagIcon" />
            <Dropdown trigger={['click', 'hover']} overlay={accountMenu(logout, {
              fullName, avatar: url, authReducer
            })} placement="bottomRight">
                <div className="accountWrapper"  style={{cursor: 'pointer'}}>
                  {isDesktopOrLaptop && <Text>{name && `Hi, ${name}`}</Text>}
                  <Avatar
                    shape="square"
                    size={isDesktopOrLaptop ? 'large' : 'default'}
                    src={url}
                    icon="user"
                    style={{marginLeft: isDesktopOrLaptop ? 10 : 0 }}
                  />
                </div>
            </Dropdown>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};


const mapStateToProps = (state) => ({
  auth: state.activeDirectoryReducer,
  authReducer: state.authReducer,
  user: state.userReducer,
  step: state.userKpiStateReducer,
  notificationReducer: state.notificationReducer
});
const connectToComponent = connect(mapStateToProps)(Header);


export default withRouter(connectToComponent);


Header.propTypes = {
  history: PropTypes.instanceOf(Object),
  collapsed: PropTypes.bool,
  toggle: PropTypes.func,
  notificationReducer: PropTypes.instanceOf(Object),
  authReducer: PropTypes.instanceOf(Object),
  logout: PropTypes.func
};
