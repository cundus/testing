import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Route } from 'react-router';
// import {GetInfoUser } from  '../../redux/actions/user';
// Stores Redux
// import Stores from '../../redux/store/index';

const RenderedRoute = (Component, child, title, logout) => (props) => {
  return (<Component {...props} child={child} logout={logout} />);
};

export const MainRouter = ({
  path,
  component,
  title,
  exact = false,
  child = [],
  logout
}) => (
  <Route
    exact={exact}
    path={path}
    render={RenderedRoute(component, child, title, logout)}
  />
);

export const MappedRouter = (props) => {
  const { routes } = props;
  return (
    <>
      {routes.map((route, i) => (
        <MainRouter key={i} {...route} auth={props.auth} logout={props.logout}/>
      ))}
    </>
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
