import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// Routes
import routes from './routes/Route';

// Stores
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
