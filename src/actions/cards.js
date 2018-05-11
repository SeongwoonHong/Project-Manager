/**
 * Action types
 */
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const ADD_LABEL = 'ADD_LABEL';

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

export function addLabel(cardId, content) {
  return {
    type: ADD_LABEL,
    cardId,
    content,
  };
}
