import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';
import Loading from './Loading.jsx';
var gravatar = require('gravatar');

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderPosts = this.renderPosts.bind(this);
  }

  renderAuthorPic(mail){
    if(mail){
      return(
        <Image floated='right' size='mini' src={gravatar.url(mail.address)} />
      );
    } else {
      return(
        <Loading/>
      );
    }
  }

  renderPosts(){
    if(this.props.posts.length !== 0){
      return this.props.posts.map((post) => (
        <Card key={post._id}>
          <Card.Content>
            {post.authorMails ? this.renderAuthorPic(post.authorMails[0]) : null}
            <Card.Header>
              {post.title}
            </Card.Header>
            <Card.Meta>
              {post.authorName}
            </Card.Meta>
            <Card.Description>
              {post.text}
            </Card.Description>
          </Card.Content>
        </Card>
      ));
    } else {
      return(
        <Loading/>
      );
    }
  }

  render() {
    return (
      <Card className="profile">
        <Card.Content header={
          <div className="profileTop">
            <Header as='h4' image>
              <Header.Content>
                Yeni Makaleler
              </Header.Content>
            </Header>
          </div>
        }/>
        <Card.Content description={
          this.renderPosts()
        }/>
      </Card>
    );
  }
}

export default NewsContainer = withTracker(props => {
  Meteor.subscribe('posts');
  Meteor.subscribe('users');

  let users = Meteor.users.find().fetch();

  const posts = Posts.find({}, {transform: function (post) {
    const author = Meteor.users.findOne({_id: post.authorId}, { fields: { username: 1, emails: 1 }});
    if(author){
      post.authorName = author.username;
      post.authorMails = author.emails;
    }
    return post;
  }}).fetch();

  return {
    posts
  };
})(News);
