import * as types from './types';

export function bgColorChange(backgroundColor) {
  return {
    type: types.BG_COLOR_CHANGE,
    backgroundColor,
  };
}

