import React, {Component} from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import 'semantic-ui-css/semantic.min.css';

import { Posts } from '../api/posts.js';
import { Categories } from '../api/categories.js';

import NavContainer from './Nav.jsx';
import News from './News.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import ProfileContainer from './Profile.jsx';
import NewPost from './NewPost.jsx';
import PostDetailsContainer from './PostDetails.jsx';
import EditPostContainer from './EditPost.jsx';
import Login from './Login.jsx';
import SettingsContainer from './Settings.jsx';
import About from './About.jsx';
import Loading from './Loading.jsx';
import NotFound from './NotFound.jsx';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <PublicRoute {...rest} component={matchProps => (
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

const PublicRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <NavContainer {...matchProps} />
        <Component {...matchProps} />
      </div>
    )} />
  )
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={ createHistory() }>
        <div className="fullHeight">
          <Switch>
            <PublicRoute path="/" exact component={News}/>
            <PublicRoute path="/posts/:category?" exact component={PostListContainer}/>
            <PrivateRoute path="/newPost" exact component={NewPost}/>
            <PrivateRoute path="/editPost/:postId?" exact component={EditPostContainer}/>
            <PrivateRoute path="/settings" exact component={SettingsContainer}/>
            <PublicRoute path="/postDetails/:postId?" exact component={PostDetailsContainer}/>
            <PublicRoute path="/profile/:username?" exact component={ProfileContainer}/>
            <PublicRoute path="/loading" exact component={Loading}/>
            <PublicRoute path="/about" exact component={About}/>
            <PublicRoute path="/login" exact component={Login}/>
            <PublicRoute path="/forgotPassword" exact component={ForgotPassword}/>
            <PublicRoute component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
