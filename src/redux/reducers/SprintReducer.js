import update from 'immutability-helper';
import { PlanningView } from '../types';

const INITIAL_STATE = {
  sprints: {
    loading: false,
    error: null,
    sprints: []
  },
  details: {
    loading: false,
    error: null,
    details: null
  },
  stories: {
    loading: false,
    error: null,
    stories: []
  },
  votes: {
    loading: false,
    error: null,
    votes: []
  },
  voting: {
    loading: false,
    error: null,
  },
  finalize: {
    loading: false,
    error: null,
    result: null
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlanningView.GET_ALL_SPRINTS_REQUEST:
      return update(state, {
        sprints: {
          loading: { $set: true },
          error: { $set: null },
        }
      });
    case PlanningView.GET_ALL_SPRINTS_SUCCESS:
      return update(state, {
        sprints: {
          loading: { $set: false },
          sprints: { $set: action.payload }
        }
      });
    case PlanningView.GET_ALL_SPRINTS_FAIL:
      return update(state, {
        sprints: {
          loading: { $set: false },
          error: { $set: action.payload },
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
    case PlanningView.GET_SPRINT_ACTIVE_STORY_VOTES_REQUEST:
      return update(state, {
        votes: {
          loading: { $set: true },
          error: { $set: null },
        }
      });
    case PlanningView.GET_SPRINT_ACTIVE_STORY_VOTES_SUCCESS:
      return update(state, {
        votes: {
          loading: { $set: false },
          votes: { $set: action.payload }
        }
      });
    case PlanningView.GET_SPRINT_ACTIVE_STORY_VOTES_FAIL:
      return update(state, {
        votes: {
          loading: { $set: true },
          error: { $set: action.payload },
        }
      });
    case PlanningView.VOTE_STORY_REQUEST:
      return update(state, {
        voting: {
          loading: { $set: true },
          error: { $set: null },
        }
      });
    case PlanningView.VOTE_STORY_SUCCESS:
      return update(state, {
        voting: {
          loading: { $set: false },
        }
      });
    case PlanningView.VOTE_STORY_FAIL:
      return update(state, {
        voting: {
          loading: { $set: true },
          error: { $set: action.payload },
        }
      });
    case PlanningView.CHANGE_VOTE_STORY_REQUEST:
      return update(state, {
        voting: {
          loading: { $set: true },
          error: { $set: null },
          result: { $set: null },
        }
      });
    case PlanningView.CHANGE_VOTE_STORY_SUCCESS:
      return update(state, {
        voting: {
          loading: { $set: false },
          result: { $set: action.payload }
        }
      });
    case PlanningView.CHANGE_VOTE_STORY_FAIL:
      return update(state, {
        voting: {
          loading: { $set: true },
          error: { $set: action.payload },
        }
      });
    case PlanningView.FINALIZE_STORY_REQUEST:
      return update(state, {
        finalize: {
          loading: { $set: true },
          error: { $set: null },
          result: { $set: null },
        }
      });
    case PlanningView.FINALIZE_STORY_SUCCESS:
      return update(state, {
        finalize: {
          loading: { $set: false },
          result: { $set: action.payload }
        }
      });
    case PlanningView.FINALIZE_STORY_FAIL:
      return update(state, {
        finalize: {
          loading: { $set: true },
          error: { $set: action.payload },
        }
      });
    default:
      return state;
  }
};
