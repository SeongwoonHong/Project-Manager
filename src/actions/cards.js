/**
 * Action types
 */
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const ADD_LABEL = 'ADD_LABEL';
export const FETCH_CARDS = 'FETCH_CARDS';
export const RESET_CARDS = 'RESET_CARDS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const CARD_ADD_COMMENT = 'CARD_ADD_COMMENT';
export const CARD_UPDATE_COMMENT = 'CARD_UPDATE_COMMENT';
export const CARD_REMOVE_COMMENT = 'CARD_REMOVE_COMMENT';

/**
 * Action creators
 */
export function addCard(title, cardId) {
  return {
    type: ADD_CARD,
    title,
    cardId
  };
}

export function updateCard(cardId, title, description) {
  return {
    type: UPDATE_CARD,
    cardId,
    title,
    description
  };
}

export function deleteCard(cardId) {
  return {
    type: DELETE_CARD,
    cardId
  };
}

export function addLabel(cardId, content) {
  return {
    type: ADD_LABEL,
    cardId,
    content
  };
}

export function fetchCards() {
  return {
    type: FETCH_CARDS,
  };
}

export function resetCards() {
  return {
    type: RESET_CARDS,
  };
}

export function addComment(cardId, comment, time) {
  return {
    type: CARD_ADD_COMMENT,
    cardId,
    comment,
    time,
  };
}

export function updateComment(cardId, time, newComment, isEdit = false) {
  return {
    type: CARD_UPDATE_COMMENT,
    cardId,
    time,
    newComment,
    isEdit
  };
}

export function removeComment(cardId, time) {
  return {
    type: CARD_REMOVE_COMMENT,
    cardId,
    time
  };
}
