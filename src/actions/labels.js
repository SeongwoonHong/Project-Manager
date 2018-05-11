
export const ADD_LABEL = 'ADD_LABEL';

export function addLabel(labelId, content) {
  return {
    type: ADD_LABEL,
    labelId,
    content,
  };
}
