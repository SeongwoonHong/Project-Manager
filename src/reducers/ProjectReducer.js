import * as types from '../actions/types';

const initialState = {
  id: 0,
  name: 'name test',
  boards: [
    {
      'back-log': [
        {
          title: 'title1',
          description: 'description1',
        },
        {
          title: 'title2',
          description: 'description2',
        },
        {
          title: 'title3',
          description: 'description3',
        }
      ],
      'in-progress': [
        {
          title: 'title4',
          description: 'description4',
        }
      ]
    },
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.APP:
      return initialState;
    default:
      return state;
  }
}
