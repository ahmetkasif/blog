import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className="profile">
        <Card.Content header={
          <div className="profileTop">
            <Header as='h4'>
              <Header.Content>
                Hakkında
              </Header.Content>
            </Header>
          </div>
        }/>
        <Card.Content>
          TODO
        </Card.Content>
      </Card>
    );
  }
}
