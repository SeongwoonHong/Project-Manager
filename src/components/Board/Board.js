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

    if (type === 'CARD') {
      dispatch(Lanes.moveCard(source.droppableId, source.index, destination.index));

      return false;
    }

    // to be implemented...
  }

  render() {
    const { lanes, project } = this.props;

    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="test" type="LANE" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef} style={{ display: 'inline-block' }}>
                <StyledBoardContainer>
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
                </StyledBoardContainer>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <AddLane />
      </div>
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

