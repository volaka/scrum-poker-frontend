import axios from 'axios';
import { push } from 'connected-react-router';
import { AddStory } from '../types';
import { getAllSprints } from './SprintActions';
import { baseURL } from '../../utils/api/constants';

/***
 * This functions makes a request to backend
 * and after successful message, redirects to new sprint page
 */
export const addSprint = (data) => dispatch => {
  dispatch({ type: AddStory.ADD_SPRINT_REQUEST });
  axios({
    method: 'POST',
    url: '/api/sprint',
    baseURL,
    data
  }).then(() => {
    dispatch({ type: AddStory.ADD_SPRINT_SUCCESS });
    dispatch(push(`/poker-planning-view-as-scrum-master/${data.name}`));
    dispatch(getAllSprints());
  })
    .catch(error => {
      dispatch({
        type: AddStory.ADD_SPRINT_FAIL,
        payload: error.response.data.result
      });
    });
};
