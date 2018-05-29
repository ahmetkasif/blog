import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';
import Loading from './Loading.jsx';
var gravatar = require('gravatar');

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderPost = this.renderPost.bind(this);
    this.renderAuthorActions = this.renderAuthorActions.bind(this);
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

  renderAuthorActions(){
    if(this.props.post.authorId === Meteor.userId()){
      return(
        <Button color='teal' onClick={() => this.props.history.push('/editPost/' + this.props.post._id, {id: this.props.post._id})}>Düzenle</Button>
      );
    }
  }

  renderPost(){
    if(this.props.post){
      return (
        <Card key={this.props.post._id} className="postFrame">
          <Card.Content className="postFrameHeader" header={
            <Header as='h4' image>
              {this.props.post.authorMails ? this.renderAuthorPic(this.props.post.authorMails[0]) : null}
              <Header.Content>
                <Label color='red' horizontal style={{marginBottom: '0.15em'}}>{this.props.post.title}</Label>
                <Header.Subheader style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/profile/' + this.props.post.authorName, {username: this.props.post.authorName})}><Label basic horizontal>{this.props.post.authorName}</Label></Header.Subheader>
              </Header.Content>
            </Header>
          }/>
          <Card.Content>
            {this.props.post.text}
          </Card.Content>
          <Card.Content extra>
            <Label horizontal as='a' color='green'>Yeni</Label>
            <Label horizontal as='a' color='red'>Teknoloji</Label>
            <Label horizontal as='a' color='teal'>Eğitim</Label>
          </Card.Content>
          <Card.Content extra>
            <div className='ui'>
              {this.renderAuthorActions()}
              <Button color='blue' disabled>Paylaş</Button>
            </div>
          </Card.Content>
        </Card>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderPost()}
      </div>
    );
  }
}

export default PostDetailsContainer = withTracker(props => {
  Tracker.autorun(() => {
    Meteor.subscribe('users');
    Meteor.subscribe('post', props.match.params.postId);
  });

  const post = Posts.findOne({_id: props.match.params.postId}, {transform: function (post) {
    const author = Meteor.users.findOne({_id: post.authorId}, { fields: { username: 1, emails: 1 }});
    if(author){
      post.authorName = author.username;
      post.authorMails = author.emails;
    }
    return post;
  }});

  return{
    post
  };
})(PostDetails);
