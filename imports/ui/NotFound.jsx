import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading">
        <h3>Sayfa bulunamadı.</h3>
        <Button
          icon={<Icon link as="span" className='fa fa-exclamation-triangle'/>}
          content='Geri dön'
          labelPosition='left'
          color='orange'
          onClick={() => this.props.history.goBack()}
        />
      </div>
    );
  }
}
