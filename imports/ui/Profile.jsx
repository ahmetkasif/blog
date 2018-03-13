import React, { Component, constructor } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';

var gravatar = require('gravatar');

import Loading from './Loading.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderProfile = this.renderProfile.bind(this);
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

  renderProfile(){
    if(this.props.user){
      return(
        <Card className="profile">
          <Card.Content header={
            <div className="profileTop">
              <Header as='h4' image>
                <Image src={gravatar.url(this.props.user.emails[0].address)} />
                <Header.Content>
                  {this.props.user.username}
                  <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
                </Header.Content>
              </Header>
            </div>
          }/>
          <Card.Content description={
            this.renderPosts()
          }/>
        </Card>
      );
    } else {
      return(
        <Loading/>
      );
    }
  }

  render() {
    return(
      <div>
        {this.renderProfile()}
      </div>
    );
  }
}

export default ProfileContainer = withTracker(props => {
  Meteor.subscribe('userPosts');
  const user = Meteor.users.findOne(Meteor.userId(), {profile: 1, username: 1, emails: 1});

  const posts = Posts.find({}, {transform: function (post) {
    const author = Meteor.users.findOne({_id: post.authorId}, { fields: { username: 1, emails: 1 }});
    if(author){
      post.authorName = author.username;
      post.authorMails = author.emails;
    }
    return post;
  }}).fetch();

  return{
    user,
    posts
  };
})(Profile);
