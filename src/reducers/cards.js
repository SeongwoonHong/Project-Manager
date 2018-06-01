import { Cards } from 'actions';

export default function (state = {}, action) {
  switch (action.type) {
    case Cards.ADD_CARD:
      localStorage.setItem('pm-cards', JSON.stringify({
        ...state,
        [action.cardId]: {
          cardId: action.cardId,
          title: action.title,
          labels: [],
        },
      }));

      return {
        ...state,
        [action.cardId]: {
          cardId: action.cardId,
          title: action.title,
          labels: [],
        },
      };
    case Cards.UPDATE_CARD:
      localStorage.setItem('pm-cards', JSON.stringify({
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          title: action.title,
          description: action.description,
        }
      }));

      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          title: action.title,
          description: action.description,
        }
      };
    case Cards.DELETE_CARD:
      localStorage.setItem('pm-cards', JSON.stringify({
        ...Object.keys(state).reduce((result, key) => {
          if (key !== action.cardId) {
            result[key] = state[key];
          }
          return result;
        }, {})
      }));

      return {
        ...Object.keys(state).reduce((result, key) => {
          if (key !== action.cardId) {
            result[key] = state[key];
          }
          return result;
        }, {})
      };
    case Cards.ADD_LABEL:
      localStorage.setItem('pm-cards', JSON.stringify({
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          labels: [
            ...action.content,
          ],
        }
      }));

      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          labels: [
            ...action.content,
          ],
        }
      };
    case Cards.FETCH_CARDS: {
      const cards = JSON.parse(localStorage.getItem('pm-cards')) || {};

      return {
        ...cards,
      };
    }
    case Cards.RESET_CARDS:
      return {};
    default:
      return state;
  }
}
