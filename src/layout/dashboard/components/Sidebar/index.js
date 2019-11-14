import React from "react";
import { Layout, Menu, Icon, /*Typography*/ } from "antd";
import { Link } from "react-router-dom";
import Router from "../../../../Router";

const { Sider } = Layout;

const Sidebar = props => {
  const mainRouter = Router.filter(x => x.menuLevel === 1);
  const pathlocation = window.location.pathname;
  const { collapsed, toggle } = props;
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
    </Sider>
  );
};

export default Sidebar;
