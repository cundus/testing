import React from "react";
import { Layout, Menu, Icon, /*Typography*/ } from "antd";
import  { connect } from  'react-redux';
import { Link } from "react-router-dom";
import MenuList from "../../../../routes/MenuList";
import _ from  'lodash';

const { Sider } = Layout;

const Sidebar = props => {
  let mainRouter = MenuList.filter(x => x.menuLevel === 1);
  const pathlocation = window.location.pathname;
  const { collapsed, toggle } = props;
  const isManager = _.get(props, 'user.result.user.manager', false);
  if (isManager === false) {
    mainRouter = mainRouter.filter(d=> d.title !== 'My Team');
  }
  return (
    <Sider
      style={{ zIndex: 1, boxShadow: "0px 1px 9px -3px rgba(0, 0, 0, 0.75)" }}
      trigger={null}
      collapsible
      collapsedWidth={0}
      collapsed={collapsed}
    >
      <Menu
        style={{ width: 275, height: "100vh" }}
        selectedKeys={[pathlocation]}
        mode="inline"
        theme="light"
      >
        <div style={{ padding: 4, textAlign: "right" }}>
          <Icon
            type="close"
            style={{
              color: "white",
              background: "lightgray",
              padding: 4,
              borderRadius: 4
            }}
            onClick={toggle}
          />
        </div>
          {mainRouter.map((menu) => {
            // check is has child
            const childsRoutes = MenuList.filter(menuChild => menuChild.parent === menu.title);
            if (childsRoutes.length === 0) {
              return (
                <Menu.Item key={`${menu.path}`}>
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
                    return (
                      <Menu.Item key={`${menuChild.path}`}>
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
    </Sider>
  );
};

const mapStateToProps = state => ({
  auth: state.authReducer,
  user: state.userReducers
});
const connectToComponent = connect(mapStateToProps)(Sidebar);


export default connectToComponent;
