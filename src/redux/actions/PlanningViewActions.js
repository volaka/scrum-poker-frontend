import axios from 'axios';
import { PlanningView } from '../types';

export const getSprintDetails = (name) => dispatch => {
  dispatch({ type: PlanningView.GET_SPRINT_DETAILS_REQUEST });
  axios({
    method: 'GET',
    url: `/api/sprint/${name}`
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
    url: `/api/sprint/${name}/stories`
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
    url: `/api/sprint/${name}/active/votes`
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
    data: {
      storyId,
      point,
      voter
    }
  }).then(response => {
    dispatch({
      type: PlanningView.VOTE_STORY_SUCCESS,
      payload: response.data.result
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

export const finalizeStory = (sprintName, point) => dispatch => {
  dispatch({ type: PlanningView.FINALIZE_STORY_REQUEST });
  axios({
    method: 'PUT',
    url: '/api/story/finalize',
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
