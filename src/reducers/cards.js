import { Cards } from 'actions';

export default function (state = {}, action) {
  switch (action.type) {
    case Cards.ADD_CARD:
      return {
        ...state,
        [action.cardId]: {
          cardId: action.cardId,
          title: action.title,
          labels: [],
        },
      };
    case Cards.UPDATE_CARD:
      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          title: action.title,
          description: action.description,
        }
      };
    case Cards.DELETE_CARD:
      return {
        ...Object.keys(state).reduce((result, key) => {
          if (key !== action.cardId) {
            result[key] = state[key];
          }
          return result;
        }, {})
      };
    case Cards.ADD_LABEL:
      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          labels: [
            ...action.content,
          ],
        }
      };
    default:
      return state;
  }
}
