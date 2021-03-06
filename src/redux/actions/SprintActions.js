import axios from 'axios';
import { PlanningView } from '../types';
import { baseURL } from '../../utils/api/constants';

export const getAllSprints = () => dispatch => {
  dispatch({ type: PlanningView.GET_ALL_SPRINTS_REQUEST });
  axios({
    method: 'GET',
    url: '/api/sprint',
    baseURL
  }).then(response => {
    dispatch({
      type: PlanningView.GET_ALL_SPRINTS_SUCCESS,
      payload: response.data.result
    });
  })
    .catch(error => {
      dispatch({
        type: PlanningView.GET_ALL_SPRINTS_FAIL,
        payload: error.response.data.result || error.response.message
      });
    });
};

export const getSprintDetails = (name) => dispatch => {
  dispatch({ type: PlanningView.GET_SPRINT_DETAILS_REQUEST });
  axios({
    method: 'GET',
    url: `/api/sprint/${name}`,
    baseURL
  }).then(response => {
    dispatch({
      type: PlanningView.GET_SPRINT_DETAILS_SUCCESS,
      payload: response.data.result
    });
  })
    .catch(error => {
      dispatch({
        type: PlanningView.GET_SPRINT_DETAILS_FAIL,
        payload: error.response.data.result || error.response.message
      });
    });
};

export const getSprintStories = (name) => dispatch => {
  dispatch({ type: PlanningView.GET_SPRINT_STORIES_REQUEST });
  axios({
    method: 'GET',
    url: `/api/sprint/${name}/stories`,
    baseURL
  }).then(response => {
    dispatch({
      type: PlanningView.GET_SPRINT_STORIES_SUCCESS,
      payload: response.data.result
    });
  })
    .catch(error => {
      dispatch({
        type: PlanningView.GET_SPRINT_STORIES_FAIL,
        payload: error.response.data.result || error.response.message
      });
    });
};

export const getSprintActiveStoryVotes = (name) => dispatch => {
  dispatch({ type: PlanningView.GET_SPRINT_ACTIVE_STORY_VOTES_REQUEST });
  axios({
    method: 'GET',
    url: `/api/sprint/${name}/active/votes`,
    baseURL
  }).then(response => {
    dispatch({
      type: PlanningView.GET_SPRINT_ACTIVE_STORY_VOTES_SUCCESS,
      payload: response.data.result
    });
  })
    .catch(error => {
      dispatch({
        type: PlanningView.GET_SPRINT_ACTIVE_STORY_VOTES_FAIL,
        payload: error.response.data.result || error.response.message
      });
    });
};

export const voteStory = (storyId, point, voter, sprintName) => dispatch => {
  dispatch({ type: PlanningView.VOTE_STORY_REQUEST });
  axios({
    method: 'POST',
    url: '/api/story/vote',
    baseURL,
    data: {
      storyId,
      point,
      voter
    }
  }).then(() => {
    dispatch({
      type: PlanningView.VOTE_STORY_SUCCESS
    });
    dispatch(getSprintActiveStoryVotes(sprintName));
  })
    .catch(error => {
      dispatch({
        type: PlanningView.VOTE_STORY_FAIL,
        payload: error.response.data.result || error.response.message
      });
    });
};

export const changeVote = (voteId, point, sprintName) => dispatch => {
  dispatch({ type: PlanningView.CHANGE_VOTE_STORY_REQUEST });
  axios({
    method: 'PUT',
    url: '/api/story/vote',
    baseURL,
    data: {
      voteId,
      point
    }
  }).then(response => {
    dispatch({
      type: PlanningView.CHANGE_VOTE_STORY_SUCCESS,
      payload: response.data.result
    });
    dispatch(getSprintActiveStoryVotes(sprintName));
  })
    .catch(error => {
      dispatch({
        type: PlanningView.CHANGE_VOTE_STORY_FAIL,
        payload: error.response.data.result || error.response.message
      });
    });
};

export const setNewDevLink = (name, newLink) => dispatch => {
  dispatch({ type: PlanningView.CHANGE_DEV_LINK_REQUEST });
  axios({
    method: 'PUT',
    url: '/api/sprint/link',
    baseURL,
    data: {
      name,
      newLink
    }
  }).then(() => {
    dispatch({
      type: PlanningView.CHANGE_DEV_LINK_SUCCESS,
    });
    dispatch(getSprintDetails(newLink));
  })
    .catch(error => {
      dispatch({
        type: PlanningView.CHANGE_DEV_LINK_FAIL,
        payload: error.response.data.result || error.response.message
      });
    });
};

export const finalizeStory = (sprintName, point) => dispatch => {
  dispatch({ type: PlanningView.FINALIZE_STORY_REQUEST });
  axios({
    method: 'PUT',
    url: '/api/story/finalize',
    baseURL,
    data: {
      sprintName,
      point
    }
  }).then(response => {
    dispatch({
      type: PlanningView.FINALIZE_STORY_SUCCESS,
      payload: response.data.result
    });
    dispatch(getSprintStories(sprintName));
    dispatch(getSprintActiveStoryVotes(sprintName));
  })
    .catch(error => {
      dispatch({
        type: PlanningView.FINALIZE_STORY_FAIL,
        payload: error.response.data.result || error.response.message
      });
    });
};
