import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Header, Icon, Input, Dropdown, Label, Form, TextArea } from 'semantic-ui-react';
import Noty from 'noty';
import Loading from './Loading.jsx';

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: "",
      categories: [],
      tag: ""
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateText = this.updateText.bind(this);
    this.editPost = this.editPost.bind(this);
  }

  componentDidMount(){
    if(this.props.post){
      this.setState({
        title: this.props.post.title,
        text: this.props.post.text
      });
    }
  }

  updateTitle(event, data){
    this.setState({
      title: data.value
    });
  }

  updateText(event, data){
   this.setState({
     text: data.value
   });
 }

  editPost(){
    Meteor.call(
      'editPost',
      this.props.post._id,
      this.state.title,
      this.state.text,
      this.state.categories
    );
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'İçerik başarıyla güncellendi.',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
    this.props.history.push('/');
  }

  render() {
    if(this.props.post){
      return (
        <div className="newPost">
          <h3 className="newPostHeader">Makaleyi Güncelle</h3>
          <div className="newPostContent">
            <Input
              label='Makale Başlığı'
              size='small'
              placeholder="Başlık giriniz.."
              value={this.state.title}
              type="text"
              onChange={this.updateTitle}
              className='each'
            />
            <Form className="each">
              <TextArea
                size='large'
                placeholder="Yazı"
                type="text"
                value={this.state.text}
                onChange={this.updateText}
                className="each"
              />
            </Form>
          </div>
          <div>
            <Button
              size="medium"
              color="red"
              content="İptal"
              onClick={() => this.props.history.push('/postDetails/' + this.props.post._id, {id: this.props.post._id})}
            />
            <Button
              size="medium"
              color="teal"
              content="Güncelle"
              onClick={() => this.editPost()}
            />
          </div>
        </div>
      );
    } else {
      return(
        <Loading/>
      );
    }
  }
}

export default EditPostContainer = withTracker(props => {
  Meteor.subscribe('post', props.match.params.postId);

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
})(EditPost);
