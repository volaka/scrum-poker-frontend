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
