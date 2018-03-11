import React, { Component, constructor } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';
import Gravatar from 'react-gravatar';

import Loading from './Loading.jsx';

class Profile extends Component {
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
              {post.ownerId}
            </Card.Meta>
            <Card.Description>
              {post.text}
            </Card.Description>
          </Card.Content>
        </Card>
      ));
    } else {
      <Loading/>
    }
  }

  render() {
    if (this.props.user) {
      return (
        <Card className="profile">
          <Card.Content header={
            <div className="profileTop">
              <Header as='h4' image>
                <Gravatar email={this.props.user.emails[0].address} />
                <Header.Content>
                  {this.props.user.username}
                  <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
                </Header.Content>
              </Header>
            </div>
          } />
          <Card.Content description={
            this.renderPosts()
          }/>
        </Card>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }
}

export default ProfileContainer = withTracker(props => {
  Meteor.subscribe('userPosts');
  const user = Meteor.users.findOne(Meteor.userId(), {profile: 1, username: 1, emails: 1});
  const posts = Posts.find({}).fetch();
  return{
    user,
    posts
  };
})(Profile);
