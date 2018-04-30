import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { colors } from 'utils/colors';
import Card from 'components/Card/Card';
import AddItem from 'components/AddItem/AddItem';
import SwimLaneHeader from './SwimLaneHeader/SwimLaneHeader';

class SwimLane extends Component {
  state = {
    isEditing: false,
    title: '',
    isHeaderOpened: false,
  }

  onCancelHandler = () => this.setState({ isEditing: false });

  closeHeader = () => this.setState({ isHeaderOpened: false });

  renderCards = () => {
    const { project } = this.props;

    return project.lanes.map(() => {
      return (
        <Card />
      );
    });
  }

  render() {
    const { project } = this.props;

    return (
      <div>
        <StyledDiv>
          {
            project.lanes.length && project.lanes[0].name ? project.lanes[0].name : <SwimLaneHeader />
          }
        </StyledDiv>
        {
          this.renderCards()
        }
        {
          project.lanes[0] &&
          <StyledDiv>
            <AddItem />
          </StyledDiv>
        }
      </div>
    );
  }
}

export default connect(state => ({
  project: state.Project,
}))(SwimLane);

const StyledDiv = styled.div`
  width: 300px;
  height: 100%;
  position: relative;
  box-shadow: 0 0 0 1px rgba(34,36,38,.22) inset, 0 0 0 0 transparent;
  border-radius: 0.3rem;
  padding: 1em 1.5em;
  min-height: 1em;
  color: rgba(0, 0, 0, .87);
  background-color: ${colors.swimLane};

  > .plus.large.icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    &:hover {
      cursor: pointer;
    }
  }
`;

