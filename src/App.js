import React from 'react';
import { Provider } from 'react-redux';
// import { BrowserRouter, Switch } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// Routes
// import routes from './routes/Route';

// Store
import store from './redux/store';

// Routes
// import { Route } from './routes';
import Dashbord from '../src/layout/dashboard';

// Browser history
// const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <Provider store={store}>
      <Dashbord />
      {/* <BrowserRouter>
        <Switch>
          <Route
            history={browserHistory}
            routes={routes}
          />
        </Switch>
      </BrowserRouter> */}
    </Provider>
  );
};

export default App;
