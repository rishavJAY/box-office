import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';


// colon name(:name for dynamic url in react router)
function App() {

  const theme = {
    mainColors: {
      blue: '#2400ff',
      gray: '#c6c6c6',
      dark: '#353535',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        {/* exact is same as exact={true}, it is for matching exact path with path prop */}
        {/* below switch and route is for visiting different pages at different urls */}
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/starred">
          <Starred />
        </Route>

        <Route exact path="/show/:id">
          <Show />
        </Route>

        <Route>
          This is 404 page
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
