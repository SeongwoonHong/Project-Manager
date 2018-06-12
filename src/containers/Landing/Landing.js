import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import AddProject from 'components/AddProject/AddProject';

class Landing extends Component {
  render() {
    return (
      <Segment basic>
        <AddProject />
        <AddProject isDemo />
      </Segment>
    );
  }
}

export default withRouter(Landing);

