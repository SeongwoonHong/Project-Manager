import { Project } from 'actions';

const initialState = {
  id: null,
  name: '',
  lanes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Project.ADD_PROJECT:
      localStorage.setItem('pm-project', JSON.stringify({
        ...state,
        name: action.name,
      }));

      return {
        ...state,
        name: action.name,
      };
    case Project.PROJECT_ADD_LANE:
      localStorage.setItem('pm-project', JSON.stringify({
        ...state,
        lanes: [
          ...state.lanes,
          action.id
        ],
      }));

      return {
        ...state,
        lanes: [
          ...state.lanes,
          action.id
        ]
      };
    case Project.PROJECT_DELETE_LANE:
      localStorage.setItem('pm-project', JSON.stringify({
        ...state,
        lanes: state.lanes.filter(laneId => laneId !== action.laneId),
      }));

      return {
        ...state,
        lanes: state.lanes.filter(laneId => laneId !== action.laneId),
      };
    case Project.PROJECT_MOVE_LANE: {
      const newProject = state.lanes.slice();
      const [selectedLane] = newProject.splice(action.sourceIndex, 1);
      newProject.splice(action.destIndex, 0, selectedLane);

      localStorage.setItem('pm-project', JSON.stringify({
        ...state,
        lanes: newProject,
      }));

      return {
        ...state,
        lanes: newProject,
      };
    }
    default:
      return state;
  }
}

