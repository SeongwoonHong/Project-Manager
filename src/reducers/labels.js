import { Labels } from 'actions';

export default function (state = {}, action) {
  switch (action.type) {
    case Labels.ADD_LABEL:
      return {
        labels: [
          ...state,
          {
            labelId: action.labelId,
            selectedLabels: [action.content],
          },
        ],
      };
    default:
      return state;
  }
}
