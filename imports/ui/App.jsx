import React, {Component} from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import 'semantic-ui-css/semantic.min.css';

import Login from './Login.jsx';
import Register from './Register.jsx';
import Loading from './Loading.jsx';
import NotFound from './NotFound.jsx';

import Nav from './Nav.jsx';
import Profile from './Profile.jsx';
import NewPost from './NewPost.jsx';
import News from './News.jsx';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <DefaultLayout {...rest} component={matchProps => (
        <Component {...matchProps} />
      )} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <Nav {...matchProps} />
        <Component {...matchProps} />
      </div>
    )} />
  )
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={ createHistory() }>
        <div className="fullHeight">
          <Switch>
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <PrivateRoute path="/" exact component={News}/>
            <PrivateRoute path="/profile" exact component={Profile}/>
            <PrivateRoute path="/newPost" exact component={NewPost}/>
            <PrivateRoute path="/loading" exact component={Loading}/>
            <PrivateRoute component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
