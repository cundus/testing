import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

// Stores Redux
import Stores from '../../redux/store/index';

const RenderedRoute = (Component, child, title, auth) => (props) => {
  const store = Stores.getState();
  // console.log(accesstoken)
  if (auth !== undefined && store.authReducer.accessToken === null) {
    auth.getAccessToken();
  }
  // const token = localStorage.getItem('token');
  // const { isLogin } = state.auth;
  // // eslint-disable-next-line react/prop-types
  const { location } = props;
  const { pathname } = location;
  if (pathname === '/') {
    return <Redirect to="/home" />;
  }
  // if (token === null && !isLogin && pathname !== '/login') {
  //   return (<Redirect to="/login" />);
  // } else if (token !== null && isLogin && pathname !== '/dashboard/home' && child.length <= 0) {
  //   return (<Component {...props} child={child} />);
  // } else if (token !== null && pathname === '/login') {
  //   return (<Redirect to="/dashboard/home" />);
  // }

  return <Component {...props} child={child} auth={auth} />;
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
      {/* <Redirect from="/" to="/home" /> */}
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
