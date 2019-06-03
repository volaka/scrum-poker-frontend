import update from 'immutability-helper';
import { AddStory } from '../types';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AddStory.ADD_SPRINT_REQUEST:
      return update(state, {
        loading: { $set: true },
        error: { $set: null }
      });
    case AddStory.ADD_SPRINT_SUCCESS:
      return update(state, { loading: { $set: false } });
    case AddStory.ADD_SPRINT_FAIL:
      return update(state, {
        loading: { $set: false },
        error: { $set: action.payload }
      });
    default:
      return state;
  }
};
