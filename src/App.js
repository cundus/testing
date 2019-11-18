import React from 'react';
import { BrowserRouter, Switch /* , Route */ } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
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
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <MappedRouter
            history={browserHistory}
            routes={routes}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
