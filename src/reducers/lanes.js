import { Lanes } from 'actions';

export default function (state = {}, action) {
  switch (action.type) {
    case Lanes.ADD_LANE:
      return {
        ...state,
        [action.laneId]: {
          laneId: action.laneId,
          name: action.name,
          cards: [],
        },
      };
    case Lanes.MOVE_LANE: // Not sure about this yet..
      return {
        // ...state,
        // [action.id]: {
        //   ...state[action.id],
        //   ...action.params,
        // }
      };
    case Lanes.LANE_ADD_CARD:
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
      return {
        ...Object.keys(state).reduce((result, key) => {
          if (key !== action.laneId) {
            result[key] = state[key];
          }
          return result;
        }, {})
      };
    case Lanes.LANE_DELETE_CARD:
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
    default:
      return state;
  }
}

