import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import  Layout from './layout/dashboard/index';

import { AzureAD, AuthenticationState } from 'react-aad-msal';
import {authProvider} from './auth';


// import { createBrowserHistory } from 'history';

// Routes
// import routes from './routes/Route';

// Store
import store from './redux/store';
import { Provider } from 'react-redux';

// Routes
//import { Route } from './routes';
//import Dashbord from '../src/layout/dashboard';

// Browser history
// const browserHistory = createBrowserHistory();

// import router
import router from './Router';

const PrivateRouter = ({ component: Component, provider,...rest }) => {
  return(
    <Route {...rest} render={(props) => (
      checkAuth() === true
        ? <Component auth={provider} {...props} />
        : window.location.href = 'https://www.google.com'
  )} />)
  }


// check authentication router here
const checkAuth = ()=>{
  const auth = true;
  return auth;
}

const App = (props) => {
  return (
    <div>
      {/* <Dashbord /> */}
      <Provider store={store}>
      <AzureAD provider={authProvider} forceLogin={true} reduxStore={store}> 
      {({ login, logout, authenticationState }) => {
          if (authenticationState === AuthenticationState.Authenticated) {
            return (
              <BrowserRouter>
              <Switch>
                {
                  router.map((r, i)=> <PrivateRouter provider={authProvider} key={i}  path='r.path' {...r} />)
                }
                <Redirect from='/'  to='/home'/>
              </Switch>
            </BrowserRouter>
            );
          } else if (authenticationState === AuthenticationState.Unauthenticated) {
            return (
              <button className="Button" onClick={login}>
                Login
              </button>
            );
          }
        }}
      </AzureAD>
      </Provider>
     </div>
  );
};

export default App;
