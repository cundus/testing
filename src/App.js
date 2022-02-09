import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { AzureAD, AuthenticationState } from 'react-aad-msal';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import { authProvider } from './service/activeDirectory';
import routes from './routes/Route';
import store from './redux/store';
import { MappedRouter } from './routes/RouteGenerator';
import './styles/global-styles.scss';
import { LoadingSplash } from './components/loading';

const browserHistory = createBrowserHistory();

const App = (props) => {
  return (
    <React.Suspense fallback={<LoadingSplash />}>
    <AzureAD provider={authProvider} forceLogin reduxStore={store}>
      {(
        {
          login,
          logout,
          authenticationState,
          error
        }
      // eslint-disable-next-line consistent-return
      ) => {
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
          );
        } else if (
          authenticationState === AuthenticationState.Unauthenticated
        ) {
          localStorage.clear();
          return <div />;
        } else if (error) {
          window.location.reload();
        } else {
          return <div />;
        }
      }}
    </AzureAD>
    </React.Suspense>
  );
};

export default App;
