import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import AddProject from 'components/AddProject/AddProject';

class Landing extends Component {
  componentWillMount = () => {
    const { history } = this.props;
    const project = JSON.parse(localStorage.getItem('pm-project')) || {};

    return project.name ? history.push(`/project/${project.name}`) : false;
  }

  render() {
    return (
      <Segment basic>
        <AddProject />
      </Segment>
    );
  }
}

export default withRouter(Landing);

