import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// Routes
// import routes from './routes/Route';

// Store
// import store from './redux/store';

// Routes
//import { Route } from './routes';
//import Dashbord from '../src/layout/dashboard';

// Browser history
// const browserHistory = createBrowserHistory();

// import router
import router from './Router'

const App = () => {
  return (
    <div>
      {/* <Dashbord /> */}
      <BrowserRouter>
        <Switch>
          {
            router.map((r)=> <Route path='r.path' {...r}/>)
          }
          <Redirect from='/'  to='/home'/>
        </Switch>
      </BrowserRouter>
     </div>
  );
};

export default App;
