import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import addStory from './AddStoryReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  addStory
});
