import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';
import Loading from './Loading.jsx';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderPost = this.renderPost.bind(this);
  }

  renderPost(){
    if(this.props.post){
      <Card>
        <Card.Content>
          <Card.Header>
            {this.props.post.title}
          </Card.Header>
          <Card.Meta>
            {this.props.post.username}
          </Card.Meta>
          <Card.Description>
            {this.props.post.text}
          </Card.Description>
        </Card.Content>
      </Card>
    } else {
      return (
        <Loading/>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderPost()}
      </div>
    );
  }
}

export default PostDetailsContainer = withTracker(props => {
  const user = Meteor.users.find({_id: this.props.post.ownerId}).fetch();
  return{
    user
  };
})(PostDetails);
