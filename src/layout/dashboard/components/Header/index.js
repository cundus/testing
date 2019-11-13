import React from 'react';
import { Layout, Menu, Row, Col, Icon, Typography, Avatar } from 'antd';
import  {Link}  from 'react-router-dom';
import Logo from '../../../../assets/xl.png';
import Indonesia from '../../../../assets/indonesia-flag.png';
import "./header-styles.scss";
import Router from '../../../../Router';
const { Text } = Typography;


const Header = (props) => {
  const mainRouter = Router.filter( x =>  x.menuLevel === 1);

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

            {
              mainRouter.map( (r, i)=>{
                // check is has child
                const childsRoutes = Router.filter(rc=> rc.parent == r.name)
                if (childsRoutes.length === 0 ){
                  return(
                    <Menu.Item key={i}>
                      <Link to={r.path}>
                        {r.viewName }
                      </Link>
                    </Menu.Item> 
                  )
                } else {
                  return(
                    <Menu.SubMenu 
                      title={
                        <span className="submenu-title-wrapper">
                          {r.viewName }
                        </span>
                      }>
                        {
                          childsRoutes.map((rc, i)=> {
                            return(
                              <Menu.Item key={`${r.name}-${i}`}>
                                <Link to={rc.path}>
                                <Icon type={`${rc.icon}`} theme={`${rc.theme}`} className="dropdownItem" />
                                {rc.viewName }
                                  </Link>
                                </Menu.Item>
                            );
                          })
                        }
                    </Menu.SubMenu> 
                  )
                }
              })
            }
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