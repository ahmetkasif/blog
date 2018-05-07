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
                <Header.Content>
                  <Label color='red' horizontal>{post.title}</Label>
                  <Header.Subheader style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/profile/' + post.authorName, {username: post.authorName})}><Label basic horizontal>{post.authorName}</Label></Header.Subheader>
                </Header.Content>
              </Header.Content>
            </Header>
          }/>
          <Card.Content>
            {post.text}
          </Card.Content>
          <Card.Content extra>
            <Label horizontal as='a' color='green'>Yeni</Label>
            <Label horizontal as='a' color='red'>Teknoloji</Label>
            <Label horizontal as='a' color='teal'>Eğitim</Label>
          </Card.Content>
          <Card.Content extra>
            <div className='ui'>
              <Button color='olive' disabled>Paylaş</Button>
              <Button color='teal' onClick={() => this.props.history.push('/postDetails/' + post._id, {id: post._id})}>İncele</Button>
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

  render() {
    return (
      <Card className="card">
        <Card.Content className="cardHeader" header={
          <Header as='h4' image>
            <Header.Content>
              Yeni Makaleler
            </Header.Content>
          </Header>
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
