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
      <Menu stackable className="navContainer">
        <Menu.Item className="generated">
          <img src='/favicon.png' />
        </Menu.Item>
        <Menu.Item
          name='Anasayfa'
          className="navButton"
          active={this.props.location.pathname === '/' ? true : false}
          onClick={() => this.handleRoute('/')}>
            Anasayfa
        </Menu.Item>
        <Menu.Menu>
          <Dropdown item text='Kategoriler' className="navButton">
            <Dropdown.Menu>
              <Dropdown.Item text='tag1' onClick={() => this.handleRoute('/tags/tag1')}/>
              <Dropdown.Item text='tag2' onClick={() => this.handleRoute('/tags/tag2')}/>
              <Dropdown.Item text='tag3' onClick={() => this.handleRoute('/tags/tag3')}/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        <Menu.Item
          name='Hakkında'
          className="navButton"
          active={this.props.location.pathname === '/about' ? true : false}
          onClick={() => this.handleRoute('/about')}>
            Hakkında
        </Menu.Item>
        {Meteor.userId() ?
          <Menu.Menu position='right'>
            <Menu.Item position='right'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Başlayın...' />
                <i className='fa fa-search' />
              </div>
              <div className='results' />
            </Menu.Item>
            <Dropdown item text='Ayarlar'>
              <Dropdown.Menu>
                <Dropdown.Item text='Profil' onClick={() => this.handleRoute('/profile')}/>
                <Dropdown.Item text='Yeni Makale' onClick={() => this.handleRoute('/newPost')}/>
                <Dropdown.Item text='Hesap Ayarları' onClick={() => this.handleRoute('/settings')}/>
                <Dropdown.Item text='Çıkış Yap' onClick={() => Meteor.logout(() => this.props.history.push('/'))}/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          :
          <Menu.Menu position='right'>
            <Menu.Item position='right'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Başlayın...' />
                <i className='fa fa-search' />
              </div>
              <div className='results' />
            </Menu.Item>
            <Menu.Item
              position='right'
              name='Giriş Yap'
              onClick={() => this.handleRoute('/login')}>
                Giriş Yap
            </Menu.Item>
          </Menu.Menu>
        }
      </Menu>
    )
  }
}
