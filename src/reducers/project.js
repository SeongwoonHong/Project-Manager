import { Project } from 'actions';

const initialState = {
  id: null,
  name: '',
  lanes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Project.ADD_PROJECT:
      return {
        ...state,
        name: action.name,
      };
    case Project.PROJECT_ADD_LANE:
      return {
        ...state,
        lanes: [
          ...state.lanes,
          action.id
        ]
      };
    default:
      return state;
  }
}
