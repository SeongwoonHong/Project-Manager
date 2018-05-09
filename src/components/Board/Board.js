import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SwimLane from 'components/SwimLane/SwimLane';
import AddLane from 'components/AddLane/AddLane';

class Board extends Component {
  render() {
    const { lanes, project } = this.props;

    return (
      <StyledBoardContainer>
        {
          project.lanes.map((laneId) => {
            console.log(laneId);
            return (
              <SwimLane
                lane={lanes[laneId]}
                key={laneId}
              />
            );
          })
        }
        <AddLane />
      </StyledBoardContainer>
    );
  }
}

export default connect(state => ({
  lanes: state.Lanes,
  cards: state.Cards,
  project: state.Project,
}))(Board);

const StyledBoardContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
`;

