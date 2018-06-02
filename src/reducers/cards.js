import { Cards } from 'actions';

export default function (state = {}, action) {
  switch (action.type) {
    case Cards.ADD_CARD:
      localStorage.setItem(
        'pm-cards',
        JSON.stringify({
          ...state,
          [action.cardId]: {
            cardId: action.cardId,
            title: action.title,
            labels: []
          }
        })
      );

      return {
        ...state,
        [action.cardId]: {
          cardId: action.cardId,
          title: action.title,
          labels: [],
          comments: []
        }
      };
    case Cards.UPDATE_CARD:
      localStorage.setItem(
        'pm-cards',
        JSON.stringify({
          ...state,
          [action.cardId]: {
            ...state[action.cardId],
            title: action.title,
            description: action.description
          }
        })
      );

      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          title: action.title,
          description: action.description
        }
      };
    case Cards.DELETE_CARD:
      localStorage.setItem(
        'pm-cards',
        JSON.stringify({
          ...Object.keys(state).reduce((result, key) => {
            if (key !== action.cardId) {
              result[key] = state[key];
            }
            return result;
          }, {})
        })
      );

      return {
        ...Object.keys(state).reduce((result, key) => {
          if (key !== action.cardId) {
            result[key] = state[key];
          }
          return result;
        }, {})
      };
    case Cards.ADD_LABEL:
      localStorage.setItem(
        'pm-cards',
        JSON.stringify({
          ...state,
          [action.cardId]: {
            ...state[action.cardId],
            labels: [...action.content]
          }
        })
      );

      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          labels: [...action.content]
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
    case Cards.CARD_ADD_COMMENT: {
      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          comments: [
            ...state[action.cardId].comments,
            {
              comment: action.comment,
              time: action.time,
              isEdit: action.isEdit
            }
          ]
        }
      };
    }
    case Cards.CARD_UPDATE_COMMENT: {
      const { comments } = state[action.cardId];
      let index;

      comments.filter((comment) => {
        if (comment.time === action.time) {
          index = comments.indexOf(comment);
        }
        return index;
      });

      const preservedState = comments.filter(
        comment => comment.time !== action.time
      );

      const newState = {
        comment: action.newComment,
        time: action.time,
        isEdit: true
      };
      preservedState.splice(index, 0, newState);

      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          comments: [...preservedState]
        }
      };
    }

    case Cards.CARD_REMOVE_COMMENT: {
      const newState = state[action.cardId].comments.filter(
        comment => comment.time !== action.time
      );

      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          comments: [...newState]
        }
      };
    }

    default:
      return state;
  }
}
