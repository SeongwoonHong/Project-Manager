/**
 * Action types
 */

export const BG_COLOR_CHANGE = 'BG_COLOR_CHANGE';

/**
 * Action Creators
 */

export function bgColorChange(backgroundColor) {
  return {
    type: BG_COLOR_CHANGE,
    backgroundColor,
  };
}

