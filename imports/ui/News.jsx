import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';
import Loading from './Loading.jsx';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderPosts = this.renderPosts.bind(this);
  }

  renderPosts(){
    if(this.props.posts){
      return this.props.posts.map((post) => (
        <Card>
          <Card.Content>
            <Card.Header>
              {post.title}
            </Card.Header>
            <Card.Meta>
              {post.username}
            </Card.Meta>
            <Card.Description>
              {post.text}
            </Card.Description>
          </Card.Content>
        </Card>
      ));
    } else {
      return (
        <Loading/>
      );
    }
  }

  render() {
    return (
      <Card className="profile">
        <Card.Content>
          <Card.Header>
            Yeni Makaleler
          </Card.Header>
          <Card.Description>
            {this.renderPosts()}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default NewsContainer = withTracker(props => {
  Meteor.subscribe('posts');
  const posts = Posts.find({}).fetch();
  return{
    posts
  };
})(News);
