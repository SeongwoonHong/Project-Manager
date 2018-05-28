/**
 * Action types
 */

export const BG_COLOR_CHANGE = 'BG_COLOR_CHANGE';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
/**
 * Action Creators
 */

export function bgColorChange(backgroundColor) {
  return {
    type: BG_COLOR_CHANGE,
    backgroundColor,
  };
}

export function fetchData(isLocalStorage = false) {
  return (dispatch) => {
    dispatch({ type: FETCH_DATA });

    if (isLocalStorage) {
      const project = JSON.parse(localStorage.getItem('pm-project'));
      const lanes = JSON.parse(localStorage.getItem('pm-lanes'));
      const cards = JSON.parse(localStorage.getItem('pm-cards'));

      return dispatch({
        type: FETCH_DATA_SUCCESS,
        project,
        lanes,
        cards,
      });
    }

    return dispatch({ type: FETCH_DATA_SUCCESS });
  };
}

