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
    const { dispatch, match } = this.props;
    const isDemo = match.path.includes('demo');

    dispatch(Project.fetchProject(isDemo));
    dispatch(Lanes.fetchLanes(isDemo));
    dispatch(Cards.fetchCards(isDemo));

    return false;
  }

  render() {
    const { project } = this.props;

    return (
      <Segment className="App" basic>
        <ProjectHeader
          name={project.name}
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

