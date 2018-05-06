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
    case Project.PROJECT_DELETE_LANE:
      return {
        ...state,
        lanes: state.lanes.filter(laneId => laneId !== action.laneId),
      };
    default:
      return state;
  }
}

