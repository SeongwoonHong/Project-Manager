import * as types from '../actions/types';

const initialState = {
  backgroundColor: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BG_COLOR_CHANGE:
      return {
        ...state,
        backgroundColor: action.backgroundColor,
      };
    default:
      return state;
  }
}

