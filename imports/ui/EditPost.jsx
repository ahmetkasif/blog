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
      tag: ""
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateText = this.updateText.bind(this);
    this.editPost = this.editPost.bind(this);
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
    /*Meteor.call(
      'editPost',
      this.state.title,
      this.state.text
    );*/
    new Noty({
      type: 'success',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Makale Paylaşıldı..',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
    console.log(this.state.title + ", " + this.state.text);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="taskNew">
        <h3 className="taskNewHeader">Yeni makale</h3>
        <div className="taskNewContent">
          <Input
            label='Makale Başlığı'
            size='small'
            id="edit-task-name"
            value={this.state.title}
            type="text"
            onChange={this.updateTitle}
            className='taskName each'
          />
          <Form className="each">
            <TextArea
              size='large'
              placeholder="Yazı"
              value={this.state.text}
              onChange={this.updateText}
              className="each moreInfo"
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
