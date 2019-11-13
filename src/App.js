import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Routes
// import routes from './routes/Route';

// Store
import store from './redux/store';

// Routes
//import { Route } from './routes';
//import Dashbord from '../src/layout/dashboard';

// Browser history
// const browserHistory = createBrowserHistory();

//layout

// pages
import Home from './pages/home';
import Planing from './pages/planing';

const App = () => {
  return (
    <div>
      {/* <Dashbord /> */}
      <BrowserRouter>
        <Switch>
          {/* <Route
            history={browserHistory}
            routes={routes}
          /> */}
          <Redirect exact from='/' to='/home'/>
          <Route path='/home' exect component={Home}/>
          <Route path='/planing' exect component={Planing}/>
        </Switch>
      </BrowserRouter>
     </div>
  );
};

export default App;
