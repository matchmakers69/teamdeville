import { applyMiddleware, createStore } from 'redux';
import { loadState, saveState } from './localStorage';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import sagas from './sagas';
import throttle from 'lodash/throttle';
import thunkMiddleware from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
export default function configureStore(preloadedState) {
  const middlewares = [sagaMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const persistedState = loadState();

  const store = createStore(
    rootReducer(history),
    persistedState, // needs to be on the first position to save to storage on refresh
    composedEnhancers,
    preloadedState
  );

  store.subscribe(
    throttle(() => {
      const { selectedProductsState, cartState, wooState } = store.getState();
      saveState({
        selectedProductsState,
        cartState,
        wooState,
      });
    }, 1000)
  );
  sagaMiddleware.run(sagas);
  return store;
}
