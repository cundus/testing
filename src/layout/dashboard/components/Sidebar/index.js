import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import MenuList from '../../../../routes/MenuList';

const { Sider } = Layout;

const Sidebar = (props) => {
  let mainRouter = MenuList.filter((x) => {
    return x.menuLevel === 1;
  });
  const pathlocation = window.location.pathname;
  const { collapsed, toggle } = props;
  const isManager = _.get(props, 'user.result.user.manager', false);
  if (isManager === false) {
    mainRouter = mainRouter.filter((d) => d.title !== 'My Team');
  }
  return (
    <Sider
      style={{ zIndex: 1, boxShadow: '0px 1px 9px -3px rgba(0, 0, 0, 0.75)' }}
      trigger={null}
      collapsible
      collapsedWidth={0}
      collapsed={collapsed}
    >
      <Menu
        style={{ width: 275, height: '100vh' }}
        selectedKeys={[pathlocation]}
        mode="inline"
        theme="light"
      >
        <div style={{ padding: 4, textAlign: 'right' }}>
          <Icon
            type="close"
            style={{
              color: 'white',
              background: 'lightgray',
              padding: 4,
              borderRadius: 4
            }}
            onClick={toggle}
          />
        </div>
        {mainRouter.map((menu) => {
          // check is has child
          const childsRoutes = MenuList.filter(
            (menuChild) => menuChild.parent === menu.title
          );
          if (childsRoutes.length === 0) {
            return (
              <Menu.Item key={`${menu.path}`} disabled={(menu.title === 'Monitoring' || menu.title === 'Appraisal') && props.isAllowToMonitor}>
                <Link to={menu.path} onClick={toggle}>
                  {menu.title}
                </Link>
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
                  return (
                    <Menu.Item key={`${menuChild.path}`} disabled={(menuChild.title === 'Monitoring' || menuChild.title === 'Appraisal') && props.isAllowToMonitor}>
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
