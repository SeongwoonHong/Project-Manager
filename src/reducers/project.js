import { Project } from 'actions';

const initialState = {
  id: 0,
  name: 'name test',
  lanes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Project.ADD_PROJECT:
      return {
        ...state,
        name: action.name,
      };
    case Project.ADD_LANE:
      return {
        ...state,
        lanes: [
          ...state.lanes,
          {
            name: action.name,
            content: [],
          }
        ],
      };
    // case Project.ADD_CART:
    //   return {
    //     ...state,
    //     lanes: [
    //       ...state.lanes,
    //       state.lanes.filter(lane => lane.name === action.name).content
    //     ]
    //   }
    default:
      return state;
  }
}
