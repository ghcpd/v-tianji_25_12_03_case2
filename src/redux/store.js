import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import productsReducer from './reducers/productsReducer';
import analyticsReducer from './reducers/analyticsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  analytics: analyticsReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
