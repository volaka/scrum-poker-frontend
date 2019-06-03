import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import addStory from './AddStoryReducer';
import planningView from './PlanningViewReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  addStory,
  planningView
});
