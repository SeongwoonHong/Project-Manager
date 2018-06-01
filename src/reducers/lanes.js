import { Lanes } from 'actions';

export default function (state = {}, action) {
  switch (action.type) {
    case Lanes.ADD_LANE:
      localStorage.setItem('pm-lanes', JSON.stringify({
        ...state,
        [action.laneId]: {
          laneId: action.laneId,
          name: action.name,
          cards: [],
        },
      }));

      return {
        ...state,
        [action.laneId]: {
          laneId: action.laneId,
          name: action.name,
          cards: [],
        },
      };
    case Lanes.LANE_ADD_CARD:
      localStorage.setItem('pm-lanes', JSON.stringify({
        ...state,
        [action.laneId]: {
          ...state[action.laneId],
          cards: [
            ...state[action.laneId].cards,
            action.cardId,
          ]
        },
      }));

      return {
        ...state,
        [action.laneId]: {
          ...state[action.laneId],
          cards: [
            ...state[action.laneId].cards,
            action.cardId,
          ]
        },
      };
    case Lanes.DELETE_LANE:
      localStorage.setItem('pm-lanes', JSON.stringify({
        ...Object.keys(state).reduce((result, key) => {
          if (key !== action.laneId) {
            result[key] = state[key];
          }
          return result;
        }, {})
      }));

      return {
        ...Object.keys(state).reduce((result, key) => {
          if (key !== action.laneId) {
            result[key] = state[key];
          }
          return result;
        }, {})
      };
    case Lanes.LANE_DELETE_CARD:
      localStorage.setItem('pm-lanes', JSON.stringify({
        ...state,
        [action.laneId]: {
          ...state[action.laneId],
          cards: state[action.laneId].cards.filter(cardId => cardId !== action.cardId),
        }
      }));

      return {
        ...state,
        [action.laneId]: {
          ...state[action.laneId],
          cards: state[action.laneId].cards.filter(cardId => cardId !== action.cardId),
        }
      };
    case Lanes.LANE_MOVE_CARD: {
      const newCards = state[action.laneId].cards.slice();
      const [selectedCard] = newCards.splice(action.sourceIndex, 1);

      newCards.splice(action.destIndex, 0, selectedCard);
      localStorage.setItem('pm-lanes', JSON.stringify({
        ...state,
        [action.laneId]: {
          ...state[action.laneId],
          cards: newCards,
        }
      }));

      return {
        ...state,
        [action.laneId]: {
          ...state[action.laneId],
          cards: newCards,
        }
      };
    }
    case Lanes.LANE_MOVE_CARD_DIFFERENT_LANE: {
      const sourceCards = state[action.sourceId].cards.slice();
      const destCards = state[action.destId].cards.slice();
      const [selectedCard] = sourceCards.splice(action.sourceIndex, 1);

      destCards.splice(action.destIndex, 0, selectedCard);
      localStorage.setItem('pm-lanes', JSON.stringify({
        ...state,
        [action.sourceId]: {
          ...state[action.sourceId],
          cards: sourceCards,
        },
        [action.destId]: {
          ...state[action.destId],
          cards: destCards,
        },
      }));

      return {
        ...state,
        [action.sourceId]: {
          ...state[action.sourceId],
          cards: sourceCards,
        },
        [action.destId]: {
          ...state[action.destId],
          cards: destCards,
        },
      };
    }
    case Lanes.FETCH_LANES: {
      const lanes = JSON.parse(localStorage.getItem('pm-lanes')) || {};

      return {
        ...lanes,
      };
    }
    case Lanes.RESET_LANES:
      return {};
    default:
      return state;
  }
}

