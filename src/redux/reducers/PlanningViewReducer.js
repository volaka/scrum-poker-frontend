import update from 'immutability-helper';
import { PlanningView } from '../types';

const INITIAL_STATE = {
  details: {
    loading: false,
    error: null,
    details: null
  },
  stories: {
    loading: false,
    error: null,
    stories: []
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlanningView.GET_SPRINT_DETAILS_REQUEST:
      return update(state, {
        details: {
          loading: { $set: true },
          error: { $set: null },
          details: { $set: {} }
        }
      });
    case PlanningView.GET_SPRINT_DETAILS_SUCCESS:
      return update(state, {
        details: {
          loading: { $set: false },
          details: { $set: action.payload }
        }
      });
    case PlanningView.GET_SPRINT_DETAILS_FAIL:
      return update(state, {
        details: {
          loading: { $set: false },
          error: { $set: action.payload },
        }
      });
    case PlanningView.GET_SPRINT_STORIES_REQUEST:
      return update(state, {
        stories: {
          loading: { $set: true },
          error: { $set: null },
          stories: { $set: [] }
        }
      });
    case PlanningView.GET_SPRINT_STORIES_SUCCESS:
      return update(state, {
        stories: {
          loading: { $set: false },
          stories: { $set: action.payload }
        }
      });
    case PlanningView.GET_SPRINT_STORIES_FAIL:
      return update(state, {
        stories: {
          loading: { $set: true },
          error: { $set: action.payload },
        }
      });
    default:
      return state;
  }
};
