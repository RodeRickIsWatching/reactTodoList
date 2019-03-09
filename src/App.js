import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { Login, User, NotFound } from "./srcMap";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  render = () => {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login" render={() => <Login />} />
            <Route
              path="/user/:id/:navList(all|today|week|done|dust)"
              render={router => (
                <Provider store={store}>
                  <User router={router} />
                </Provider>
              )}
            />
            <Route path="/404" render={() => <NotFound />} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </div>
    );
  };
}

export default App;
