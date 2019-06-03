// configureStore.js
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = composeWithDevTools({});
  let middleware = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV === 'development') {
    middleware = [...middleware, reduxLogger];
  }
  const store = createStore(
      createRootReducer(history), // root reducer with router state
      preloadedState,
      composeEnhancers(applyMiddleware(...middleware)),
  );

// Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}
