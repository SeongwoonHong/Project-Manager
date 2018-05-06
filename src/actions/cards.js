/**
 * Action types
 */
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';

/**
 * Action creators
 */
export function addCard(title, cardId) {
  return {
    type: ADD_CARD,
    title,
    cardId,
  };
}

export function updateCard(cardId, title, description) {
  return {
    type: UPDATE_CARD,
    cardId,
    title,
    description,
  };
}

export function deleteCard(cardId) {
  return {
    type: DELETE_CARD,
    cardId,
  };
}

