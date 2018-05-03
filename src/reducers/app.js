import { App } from 'actions';

const initialState = {
  backgroundColor: 'lightseagreen',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case App.BG_COLOR_CHANGE:
      return {
        ...state,
        backgroundColor: action.backgroundColor,
      };
    default:
      return state;
  }
}

