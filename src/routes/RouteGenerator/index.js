import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
// import {GetInfoUser } from  '../../redux/actions/user';
// Stores Redux
// import Stores from '../../redux/store/index';

const RenderedRoute = (Component, child, title, auth) => (props) => {
  // const store = Stores.getState();
  // if (store.authReducer.accessToken === null) {
  //   (async () => {
  //     const token = await auth.getAccessToken();
  //     localStorage.setItem('token', token.accessToken);
  //   })();
  // }
  // const token = localStorage.getItem('token');
  // const { isLogin } = state.auth;
  const { location } = props;
  const { pathname } = location;
  const token = localStorage.getItem('token');
  if (pathname === '/' && token !== null) {
    return (<Redirect to="/home" />);
  }
  // if (token === null && !isLogin && pathname !== '/login') {
  //   return (<Redirect to="/login" />);
  // } else if (token !== null && isLogin && pathname !== '/dashboard/home' && child.length <= 0) {
  //   return (<Component {...props} child={child} />);
  // } else if (token !== null && pathname === '/login') {
  //   return (<Redirect to="/dashboard/home" />);
  // }
  return (<Component {...props} child={child} />);
};

export const MainRouter = ({
  path,
  component,
  title,
  exact = false,
  child = [],
  auth
}) => (
  // console.log(auth)
  <Route
    exact={exact}
    path={path}
    render={RenderedRoute(component, child, title, auth)}
  />
);

export const MappedRouter = (props) => {
  const { routes } = props;
  return (
    <React.Fragment>
      {routes.map((route, i) => (
        <MainRouter key={i} {...route} auth={props.auth} />
      ))}
    </React.Fragment>
  );
};

MainRouter.propTypes = {
  child: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(Object)]),
  component: PropTypes.instanceOf(Object).isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

MappedRouter.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired
};
