import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  onDragEnd = ({ source, destination, type }) => {
    const { dispatch, lane } = this.props;

    if (!destination) {
      return false;
    }

    if (type === 'CARD') {
      dispatch(Lanes.moveCard(lane.laneId, source.index, destination.index));

      return false;
    }

    // to be implemented...
  }

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : 'lightblue',
    marginRight: '1rem',
    width: '300px',
  });

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
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" type="CARD">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              <StyledSwimLaneContainer style={this.getListStyle(snapshot.isDraggingOver)}>
                <StyledHeader>{ lane.name }<Icon name="trash" onClick={this.laneDeleteHandler} /></StyledHeader>
                {
                  lane.cards.map((cardId, index) => (
                    <Draggable key={cardId} draggableId={cardId} index={index} style={{ margin: '1rem' }}>
                      {cardProvided => (
                        <div
                          ref={cardProvided.innerRef}
                          {...cardProvided.draggableProps}
                          {...cardProvided.dragHandleProps}
                        >
                          <Card
                            title={cards[cardId].title}
                            cardId={cards[cardId].cardId}
                            description={cards[cardId].description}
                            labels={cards[cardId].labels}
                            laneId={lane.laneId}
                            key={cardId}
                          />
                          {cardProvided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </StyledSwimLaneContainer>
              <AddCard laneId={lane.laneId} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default connect(state => ({
  cards: state.Cards,
}))(SwimLane);

const StyledSwimLaneContainer = styled(Segment)`
  width: 100%;
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

