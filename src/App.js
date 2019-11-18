import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  Layout from './layout/dashboard/index';

import { AzureAD, AuthenticationState } from 'react-aad-msal';
import {authProvider} from './service/auth/auth';


// import { createBrowserHistory } from 'history';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

// Routes
import routes from './routes/Route';

// Store
import store from './redux/store';

// Routes
import { MappedRouter } from './routes/RouteGenerator';

// Browser history
const browserHistory = createBrowserHistory();

const App = (props) => {
  return (
    <AzureAD provider={authProvider} forceLogin={true} reduxStore={store}>
      {({ login, logout, authenticationState }) => {
        if (authenticationState === AuthenticationState.Authenticated) {
            return (
              <Provider store={store}>
                <BrowserRouter>
                  <Switch>
                    <MappedRouter
                      history={browserHistory}
                      routes={routes}
                      auth={authProvider}
                      authenticationState={authenticationState}
                      login={login}
                      logout={logout}
                    />
                  </Switch>
                </BrowserRouter>
              </Provider>
            )
        } else if (authenticationState === AuthenticationState.Unauthenticated) {
          return (
            <div>
            </div>
          );
        }
      }
    }
    </AzureAD>
  );
};

export default App;
