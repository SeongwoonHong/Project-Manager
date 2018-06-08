import React, { Component } from 'react';
import { Segment as SemanticSegment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Project, Lanes, Cards } from 'actions';
import Board from 'components/Board/Board';
import ProjectHeader from 'components/ProjectHeader/ProjectHeader';

class App extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(Project.fetchProject());
    dispatch(Lanes.fetchLanes());
    dispatch(Cards.fetchCards());

    return false;
  }

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

const Segment = styled(({ className, children, ...rest }) => (
  <SemanticSegment className={className} {...rest}>
    {children}
  </SemanticSegment>
))`
  overflow: auto;
`;

