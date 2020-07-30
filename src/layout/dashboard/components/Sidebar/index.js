import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import MenuList from '../../../../routes/MenuList';
import styles from './Sidebar.styles';

const { Sider } = Layout;

const Sidebar = (props) => {
  let mainRouter = MenuList.filter((x) => {
    return x.menuLevel === 1;
  });
  const pathlocation = window.location.pathname;
  const { collapsed, toggle, isMonitoring, isAppraisal, } = props;
  const isManager = _.get(props, 'user.result.user.manager', false);
  const isNoEmpleyee = _.get(props, 'user.result.user.managerId', null);
  if (isManager === false) {
    mainRouter = mainRouter.filter((d) => d.title !== 'My Team');
  }
  // if (!isNoEmpleyee) {
  //   mainRouter = mainRouter.filter((d) => d.title === 'My Team');
  // }
  return (
    <Sider
      style={styles.sidebarContainer}
      trigger={null}
      collapsible
      collapsedWidth={0}
      collapsed={collapsed}
    >
      <Menu
        style={styles.sidebarMenuWrapper}
        selectedKeys={[pathlocation]}
        mode="inline"
        theme="light"
      >
        <div style={{ padding: 4, textAlign: 'right' }}>
          <Icon
            type="close"
            style={styles.sidebarIconClose}
            onClick={toggle}
          />
        </div>
        {mainRouter.map((menu) => {
          // check is has child
          const childsRoutes = MenuList.filter(
            (menuChild) => menuChild.parent === menu.title
          );
          if (childsRoutes.length === 0) {
            const isMonDisabled = !isMonitoring && (menu.title === 'Monitoring')
            const isApDisabled = !isAppraisal && (menu.title === 'Appraisal')
            return (
              <Menu.Item
                key={`${menu.path}`}
                disabled={isMonDisabled || isApDisabled}
              >
                <Link to={menu.path} onClick={toggle}>{menu.title}</Link>
              </Menu.Item>
            );
          } else {
            return (
              <Menu.SubMenu
                key={`${menu.name}-${menu.id}`}
                title={
                  <span className="submenu-title-wrapper">{menu.title}</span>
                }
              >
                {childsRoutes.map((menuChild) => {
                const isMonDisabled = !isMonitoring && (menu.title === 'Monitoring')
                const isApDisabled = !isAppraisal && (menu.title === 'Appraisal')
                  return (
                    <Menu.Item
                      key={`${menuChild.path}`}
                      disabled={isMonDisabled || isApDisabled}
                    >
                      <Link to={menuChild.path} onClick={toggle}>
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
    </Sider>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  user: state.userReducers
});
const connectToComponent = connect(mapStateToProps)(Sidebar);

export default connectToComponent;

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  toggle: PropTypes.func
};
