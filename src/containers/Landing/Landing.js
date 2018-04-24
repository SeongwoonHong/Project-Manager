import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import AddProject from 'components/AddProject/AddProject';

class Landing extends Component {
  render() {
    return (
      <Segment basic>
        <AddProject />
      </Segment>
    );
  }
}

export default Landing;

