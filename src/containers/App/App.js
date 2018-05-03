import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Board from 'components/Board/Board';
import ProjectHeader from 'components/ProjectHeader/ProjectHeader';

class App extends Component {
  render() {
    const { match, project } = this.props;

    return (
      <Segment className="App" basic>
        <ProjectHeader
          name={match.params.name}
        />
        <Board project={project} />
      </Segment>
    );
  }
}

export default connect(state => ({
  project: state.Project,
}))(withRouter(App));

