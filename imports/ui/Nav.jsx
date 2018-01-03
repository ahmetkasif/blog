import React, { Component } from 'react';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.handleRoute = this.handleRoute.bind(this);
  }

  handleRoute(targetRoute){
    if (targetRoute !== this.props.location.pathname) {
      this.props.history.push(targetRoute);
    }
  }

  state = {}
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
        <Menu.Item
          name='Sohbet Odası'
          active={this.props.location.pathname === 'chat'}
          onClick={() => this.handleRoute('/chat')}>
            Sohbet Odası
        </Menu.Item>
        <Menu.Item
          name='Makale Yaz'
          active={this.props.location.pathname === 'newPost'}
          onClick={() => this.handleRoute('/newPost')}>
            Yeni Makale
        </Menu.Item>
        <Menu.Menu position='right'>
          <Dropdown item text='Settings'>
            <Dropdown.Menu>
              <Dropdown.Item text='Profile' onClick={() => this.handleRoute('/profile')}/>
              <Dropdown.Item text='Settings' onClick={() => this.handleRoute('/settings')}/>
              <Dropdown.Item text='Logout' onClick={() => Meteor.logout(() => this.props.history.push('/auth'))}/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    )
  }
}
