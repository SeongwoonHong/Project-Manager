import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

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

  render() {
    const { lane, cards } = this.props;

    return (
      <div>
        <StyledSwimLaneContainer>
          <StyledHeader>{ lane.name }<Icon name="trash" /></StyledHeader>
          {
            lane.cards.map((cardId) => {
              return (
                <Card
                  data={cards[cardId]}
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

