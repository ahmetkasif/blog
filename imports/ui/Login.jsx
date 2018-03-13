import React, { Component } from 'react';
import { Button, Checkbox, Input, Card, Statistic, Modal, Header, Message } from 'semantic-ui-react';
import Noty from 'noty';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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
            <Input fluid value={this.state.username} onChange={this.updateUsername} placeholder='Kullanıcı Adı' /><br/>
            <Input fluid value={this.state.password} onChange={this.updatePassword} type='password' placeholder='Şifre' /><br/>
            <Button fluid onClick={() => this.login()} color='teal' floated='right' type='submit'>Giriş Yap</Button>
          </Card.Content>
        </Card>
        <Modal trigger={<Statistic className='authData' size='mini' value='v0.0.3'/>}>
          <Modal.Header>Son haberler ve S.S.S</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Message
                floating
                info
                header='Sürüm'
                list={[
                  '0.0.4a'
                ]}
              />
              <Message
                floating
                success
                header='Bilgi'
                list={[
                  'Makale yazarlığı için lütfen ksfahmet@gmail.com adresinden e-posta yoluyla iletişime geçiniz.',
                ]}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
