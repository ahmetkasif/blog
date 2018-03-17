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
        <Image src={gravatar.url(mail.address)} />
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
        <Card key={post._id} className="postFrame">
          <Card.Content className="postFrameHeader" header={
            <Header as='h4' image>
              {post.authorMails ? this.renderAuthorPic(post.authorMails[0]) : null}
              <Header.Content>
                {post.title}
                <Header.Subheader>{post.authorName}</Header.Subheader>
              </Header.Content>
            </Header>
          }/>
          <Card.Content>
            {post.text}
          </Card.Content>
          <Card.Content extra>
            <Label floated='right' as='a' tag>Yeni</Label>
            <Label floated='right' as='a' color='red' tag>Teknoloji</Label>
            <Label floated='right' as='a' color='teal' tag>Eğitim</Label>
          </Card.Content>
          <Card.Content extra>
            <div className='ui'>
              <Button color='olive' disabled>Paylaş</Button>
            </div>
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
        <Card className="card">
          <Card.Content className="cardHeader" header={
            <Header as='h4' image>
              <Image src={gravatar.url(this.props.user.emails[0].address)} />
              <Header.Content>
                {this.props.user.username}
                <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
              </Header.Content>
            </Header>
          }/>
          <Card.Content>
            <b>Bio: </b>Bilgisayar Mühendisi ve Yüksek Lisans Öğrencisi. Genellikle gündem, teknoloji ve eğitim ile alakalı yazılar paylaşır. Boş zamanlarında kitap okumayı ve satranç oynamayı sever. Kişisel web sayfası'na <a href="https://ahmetkasif.github.io">buradan</a> ulaşılabilir.
          </Card.Content>
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
