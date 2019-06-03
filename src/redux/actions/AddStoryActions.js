import axios from 'axios';
import { push } from 'connected-react-router';
import { AddStory } from '../types';

/***
 * This functions makes a request to backend
 * and after successful message, redirects to new sprint page
 */
export const addSprint = (data) => dispatch => {
  dispatch({ type: AddStory.ADD_SPRINT_REQUEST });
  axios({
    method: 'POST',
    url: '/api/sprint',
    data
  }).then(response => {
    dispatch({ type: AddStory.ADD_SPRINT_SUCCESS });
    dispatch(push(`/poker-planning-view-as-scrum-master/${response.data.name}`));
  })
    .catch(error => {
      dispatch({
        type: AddStory.ADD_SPRINT_FAIL,
        payload: error.response.data.result
      });
    });
};
