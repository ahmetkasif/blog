import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';
import Gravatar from 'react-gravatar';

import Loading from './Loading.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user) {
      return (
        <Card className="profile">
          <Card.Content header={
            <div className="profileTop">
              <Header as='h4' image>
                <Gravatar email={this.props.user.emails[0].address} />
                <Header.Content>
                  {this.props.user.username}
                  <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
                </Header.Content>
              </Header>
            </div>
          } />
          <Card.Content description={
            <div>Kullanıcı makalelerini burada görebilecek. TODOS</div>
          }/>
        </Card>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }
}

export default ProfileContainer = createContainer(() => {
  const user = Meteor.users.findOne(Meteor.userId(), {profile: 1, username: 1, emails: 1});
  return{
    user
  };
}, Profile);
