import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import addStory from './AddStoryReducer';
import sprint from './SprintReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  addStory,
  sprint
});
