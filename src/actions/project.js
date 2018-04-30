/**
 * Action types
 */
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_LANE = 'ADD_LANE';
export const ADD_CARD = 'ADD_CARD';
export const ADD_CART = 'ADD_CART';

/**
 * Action creators
 */
export function addProject(name) {
  return {
    type: ADD_PROJECT,
    name,
  };
}

export function addLane(name) {
  return {
    type: ADD_LANE,
    name
  };
}

export function addCard(name, content) { // name = the name of lane in which card is added.
  return {
    type: ADD_CART,
    content,
    name,
  };
}

