import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';
import Loading from './Loading.jsx';
import PostListContainer from './PostList.jsx';
var gravatar = require('gravatar');

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PostListContainer/>
    );
  }
}
