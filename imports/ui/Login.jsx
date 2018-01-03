import React, { Component } from 'react';
import { Button, Checkbox, Input, Card, Statistic, Modal, Header, Message } from 'semantic-ui-react';
import Noty from 'noty';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.location.state.username,
      password: ''
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.login = this.login.bind(this);
  }

  updateUsername(event, data){
    this.setState({
      username: data.value
    });
  }

  updatePassword(event, data){
    this.setState({
      password: data.value
    });
  }

  login(){
    if (this.state.username.toString().length !== 0 & this.state.password.toString().length !== 0) {
      Meteor.loginWithPassword(this.state.username, this.state.password, (error) => {
        if (error) {
          new Noty({
            type: 'information',
            layout: 'topRight',
            theme: 'sunset',
            text: error.message.slice(0,-5),
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        } else {
          this.props.history.push('/');
        }
      });
    } else {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Please enter your credentials..',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
    }
  }

  render() {
    return (
      <div className='loginContainer'>
        <Card className="login">
          <Card.Content>
            <Input fluid value={this.state.username} onChange={this.updateUsername} placeholder='Username' /><br/>
            <Input fluid value={this.state.password} onChange={this.updatePassword} type='password' placeholder='Password' /><br/>
            <Button fluid onClick={() => this.login()} color='teal' floated='right' type='submit'>Login</Button>
          </Card.Content>
          <Card.Content>
            Don't have an account ? <p className='authActions' onClick={() => this.props.history.push('/register', {username: this.state.username})}>Register</p>
          </Card.Content>
        </Card>
        <Modal trigger={<Statistic className='authData' size='mini' value='v1.7.8'/>}>
          <Modal.Header>Latest News and Basic Info</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Message
                floating
                info
                header='Features'
                list={[
                  'TODO'
                ]}
              />
              <Message
                floating
                success
                header='Patch Notes'
                list={[
                  'TODO',
                ]}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
