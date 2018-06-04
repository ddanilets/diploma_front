import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import routes from '../routes/routes';
import connectRoute from '../components/hoc/connectRoute';

class App extends React.PureComponent {
  render() {
    return (
      <main>
        <Switch>
          {routes.map((route) => {
            return (
              <Route
                {...route}
                key={route.path}
                component={route.component && connectRoute({ route })(route.component)}
              />);
          })}
        </Switch>
      </main>
    );
  }
}

export default hot(module)(withRouter(App));
