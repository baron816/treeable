import { createStore } from 'redux';
// import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import { fromJS } from 'immutable';
import reducer from './rootReducer';

function loadState() {
  try {
    var serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    var unserialized = JSON.parse(serializedState);

    return fromJS(unserialized);
  } catch (e) {
    console.warn('Unable to load state: ' + e)
    return undefined;
  }
}

function saveState(state) {
  try {
    var serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.warn("Failed to persist state: "+ e)
  }
}

var devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

var store = createStore(
  reducer,
  loadState(),
  devTools
);

store.subscribe(() => saveState(store.getState()));

// persistStore(store);

export default store;
