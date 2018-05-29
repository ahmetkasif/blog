import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';
import Loading from './Loading.jsx';
var gravatar = require('gravatar');

class PostList extends Component {
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

  renderAuthorActions(post){
    if(post.authorId === Meteor.userId()){
      return(
        <Button color='teal' onClick={() => this.props.history.push('/editPost/' + post._id, {id: post._id})}>Düzenle</Button>
      );
    }
  }

  renderCategories(post){
    if (post.categories) {
      return post.categories.map((category) => (
        <Label horizontal as='a' color='green' onClick={() => this.props.history.push('/posts/' + category, {category: category})}>{category}</Label>
      ));
    }    
  }

  renderPosts(){
    if(this.props.posts){
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
            {this.renderCategories(post)}
          </Card.Content>
          <Card.Content extra>
            <div className='ui'>
              <Button color='olive' onClick={() => this.props.history.push('/postDetails/' + post._id, {id: post._id})}>İncele</Button>
              {this.renderAuthorActions(post)}
              <Button color='blue' disabled>Paylaş</Button>
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
              {this.props.match ? this.props.match.params.category : "Yeni Makaleler"}
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

export default PostListContainer = withTracker(props => {
  if (props.match && props.match.params.category) {
    Tracker.autorun(() => {
      Meteor.subscribe('postsWithCategory', props.match.params.category);
      Meteor.subscribe('users');
    });

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
  } else {
    Tracker.autorun(() => {
      Meteor.subscribe('posts');
      Meteor.subscribe('users');
    });

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
  }
})(PostList);
