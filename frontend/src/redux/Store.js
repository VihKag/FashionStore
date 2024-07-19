// Store.js
import { legacy_createStore as createStore, combineReducers } from 'redux';
import cartReducer from './reducer/CartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Thêm các reducer khác vào đây
});

const store = createStore(rootReducer);

export default store;