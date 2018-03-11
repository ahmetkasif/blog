import React, { Component } from 'react';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.handleRoute = this.handleRoute.bind(this);
  }

  state = {}

  handleRoute(targetRoute){
    if (targetRoute !== this.props.location.pathname) {
      this.props.history.push(targetRoute);
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu stackable>
        <Menu.Item>
          <img src='/favicon.png' />
        </Menu.Item>
        <Menu.Item
          name='Anasayfa'
          active={this.props.location.pathname === 'home'}
          onClick={() => this.handleRoute('/')}>
            Anasayfa
        </Menu.Item>
        {Meteor.userId() ?
          <Menu.Item
            name='Makale Yaz'
            active={this.props.location.pathname === 'newPost'}
            onClick={() => this.handleRoute('/newPost')}>
              Yeni Makale
          </Menu.Item>
          : null
        }
        {Meteor.userId() ?
          <Menu.Menu position='right'>
            <Dropdown item text='Settings'>
              <Dropdown.Menu>
                <Dropdown.Item text='Profile' onClick={() => this.handleRoute('/profile')}/>
                <Dropdown.Item text='Settings' onClick={() => this.handleRoute('/settings')}/>
                <Dropdown.Item text='Logout' onClick={() => Meteor.logout(() => this.props.history.push('/auth'))}/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          :
          <Menu.Item
            position='right'
            name='Giriş Yap'
            active={this.props.location.pathname === 'login'}
            onClick={() => this.handleRoute('/login')}>
              Giriş Yap
          </Menu.Item>
        }
      </Menu>
    )
  }
}
