import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Header, Icon, Input, Dropdown, Label, Form, TextArea } from 'semantic-ui-react';
import Noty from 'noty';

export default class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: "",
      categories: [],
      tag: ""
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateText = this.updateText.bind(this);
    this.addPost = this.addPost.bind(this);
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

  addPost(){
    Meteor.call(
      'addPost',
      this.state.title,
      this.state.text,
      this.state.categories
    );
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'İçerik başarıyla eklendi',
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
    return (
      <div className="newPost">
        <h3 className="newPostHeader">Yeni makale</h3>
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
            onClick={() => this.props.history.push('/')}
          />
          <Button
            size="medium"
            color="teal"
            content="Paylaş"
            onClick={() => this.addPost()}
          />
        </div>
      </div>
    );
  }
}
