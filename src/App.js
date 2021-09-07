import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (

    <Switch>
      {/* exact is same as exact={true}, it is for matching exact path with path prop */}
      {/* below switch and route is for visiting different pages at different urls */}
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/starred">
        <Starred />
      </Route>

      <Route>
        This is 404 page
      </Route>
    </Switch>

  );
}

export default App;
