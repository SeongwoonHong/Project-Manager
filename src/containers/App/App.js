import React, { Component } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Board from '../../components/Board/Board';

class App extends Component {
  render() {
    const { match, project } = this.props;

    return (
      <Segment className="App" basic>
        <Header as="h2">
          <Icon name="folder open outline" />
          <Header.Content>
            { match.params.name }
          </Header.Content>
        </Header>
        <Board project={project} />
      </Segment>
    );
  }
}

export default connect(state => ({
  project: state.Project,
}))(withRouter(App));

