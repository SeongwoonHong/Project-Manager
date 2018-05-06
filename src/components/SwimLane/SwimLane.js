import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { Lanes, Project } from 'actions';
import { colors } from 'utils/colors';
import Card from 'components/Card/Card';
import AddCard from 'components/AddCard/AddCard';

class SwimLane extends Component {
  state = {
    isEditing: false,
    title: '',
    isHeaderOpened: false,
  }

  onCancelHandler = () => this.setState({ isEditing: false });

  closeHeader = () => this.setState({ isHeaderOpened: false });

  laneDeleteHandler = () => {
    const { lane } = this.props;
    const { dispatch } = this.props;

    dispatch(Project.deleteLane(lane.laneId));

    return dispatch(Lanes.deleteLane(lane.laneId));
  }

  render() {
    const { lane, cards } = this.props;

    return (
      <div>
        <StyledSwimLaneContainer>
          <StyledHeader>{ lane.name }<Icon name="trash" onClick={this.laneDeleteHandler} /></StyledHeader>
          {
            lane.cards.map((cardId) => {
              return (
                <Card
                  title={cards[cardId].title}
                  cardId={cards[cardId].cardId}
                  description={cards[cardId].description}
                  laneId={lane.laneId}
                  key={cardId}
                />
              );
            })
          }
        </StyledSwimLaneContainer>

        <AddCard laneId={lane.laneId} />
      </div>
    );
  }
}

export default connect(state => ({
  cards: state.Cards,
}))(SwimLane);

const StyledSwimLaneContainer = styled(Segment)`
  width: 280px;
  margin-right: 10px !important;
  height: 100%;
  position: relative;
  display: inline-block;
`;

const StyledHeader = styled(({ className, children, ...rest }) => (
  <Header className={className} {...rest}>
    {children}
  </Header>
))`
  position: relative;

  .trash.icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      color: ${colors.grey};
    }
  }
`;

