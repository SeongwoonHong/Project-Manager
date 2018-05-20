import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import SwimLane from 'components/SwimLane/SwimLane';
import AddLane from 'components/AddLane/AddLane';
import { Lanes, Project } from 'actions';

class Board extends Component {
  onDragEnd = ({ source, destination, type }) => {
    const { dispatch } = this.props;

    if (!destination) {
      return false;
    }

    if (type === 'LANE') {
      dispatch(Project.moveLane(source.index, destination.index));

      return false;
    }

    // for moving cards

    return source.droppableId !== destination.droppableId ?
      dispatch(Lanes.moveCardToOtherLane(source.droppableId, destination.droppableId, source.index, destination.index)) :
      dispatch(Lanes.moveCardInTheLane(source.droppableId, source.index, destination.index));
  }

  render() {
    const { lanes, project } = this.props;

    return (
      <StyledBoardContainer>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="test" type="LANE" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef} style={{ display: 'inline-flex' }}>
                {
                  project.lanes.map((laneId, index) => (
                    <Draggable key={laneId} draggableId={laneId} index={index} style={{ margin: '1rem' }}>
                      {laneProvided => (
                        <div
                          ref={laneProvided.innerRef}
                          {...laneProvided.draggableProps}
                          {...laneProvided.dragHandleProps}
                        >
                          <SwimLane
                            lane={lanes[laneId]}
                            key={laneId}
                          />
                          {laneProvided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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

