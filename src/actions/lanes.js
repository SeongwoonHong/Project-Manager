/**
 * Action types
 */
export const ADD_LANE = 'ADD_LANE';
export const MOVE_LANE = 'MOVE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const LANE_ADD_CARD = 'LANE_ADD_CARD';
export const LANE_DELETE_CARD = 'LANE_DELETE_CARD';
export const LANE_MOVE_CARD = 'LANE_MOVE_CARD';

/**
 * Action creators
 */
export function addLane(name, laneId) {
  return {
    type: ADD_LANE,
    name,
    laneId,
  };
}

export function moveLane(id, { ...params }) { // Not sure about this yet..
  return {
    type: MOVE_LANE,
    ...params,
  };
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId,
  };
}

export function addCard(laneId, cardId) {
  return {
    type: LANE_ADD_CARD,
    laneId,
    cardId,
  };
}

export function deleteCard(laneId, cardId) {
  return {
    type: LANE_DELETE_CARD,
    laneId,
    cardId,
  };
}

export function moveCard(laneId, sourceIndex, destIndex) {
  return {
    type: LANE_MOVE_CARD,
    laneId,
    sourceIndex,
    destIndex,
  };
}

