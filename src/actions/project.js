/**
 * Action types
 */
export const ADD_PROJECT = 'ADD_PROJECT';
export const PROJECT_ADD_LANE = 'PROJECT_ADD_LANE';
export const ADD_CARD = 'ADD_CARD';
export const ADD_CART = 'ADD_CART';
export const PROJECT_DELETE_LANE = 'PROJECT_DELETE_LANE';
export const PROJECT_MOVE_LANE = 'PROJECT_MOVE_LANE';
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
/**
 * Action creators
 */
export function addProject(name) {
  return {
    type: ADD_PROJECT,
    name,
  };
}

export function addLane(id) {
  return {
    type: PROJECT_ADD_LANE,
    id
  };
}

export function addCard(name, content) { // name = the name of lane in which card is added.
  return {
    type: ADD_CARD,
    content,
    name,
  };
}

export function deleteLane(laneId) {
  return {
    type: PROJECT_DELETE_LANE,
    laneId,
  };
}

export function moveLane(sourceIndex, destIndex) {
  return {
    type: PROJECT_MOVE_LANE,
    sourceIndex,
    destIndex,
  };
}

export function fetchProject() {
  return {
    type: FETCH_PROJECT,
  };
}

export function deleteProject(history) {
  return {
    type: DELETE_PROJECT,
    history,
  };
}

