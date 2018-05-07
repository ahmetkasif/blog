import React, {Component} from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import 'semantic-ui-css/semantic.min.css';

import { Posts } from '../api/posts.js';

import Loading from './Loading.jsx';
import NotFound from './NotFound.jsx';

import Nav from './Nav.jsx';
import About from './About.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import ProfileContainer from './Profile.jsx';
import NewPost from './NewPost.jsx';
import EditPostContainer from './EditPost.jsx';
import Login from './Login.jsx';
import NewsContainer from './News.jsx';
import SettingsContainer from './Settings.jsx';
import PostDetailsContainer from './PostDetails.jsx';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <DefaultLayout {...rest} component={matchProps => (
        <Component {...matchProps} />
      )} />
    ) : (
      <Redirect to={{
        pathname: '/',
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

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <div className="DefaultLayout">
      <Nav {...matchProps} />
      <Component {...matchProps} />
    </div>
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
            <PrivateRoute path="/newPost" exact component={NewPost}/>
            <PrivateRoute path="/editPost/:postId?" exact component={EditPostContainer}/>
            <PrivateRoute path="/settings" exact component={SettingsContainer}/>
            <DefaultLayout path="/" exact component={NewsContainer}/>
            <DefaultLayout path="/postDetails/:postId?" exact component={PostDetailsContainer}/>
            <DefaultLayout path="/profile/:username?" exact component={ProfileContainer}/>
            <DefaultLayout path="/loading" exact component={Loading}/>
            <DefaultLayout path="/about" exact component={About}/>
            <DefaultLayout path="/login" exact component={Login}/>
            <DefaultLayout path="/forgotPassword" exact component={ForgotPassword}/>
            <DefaultLayout component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
