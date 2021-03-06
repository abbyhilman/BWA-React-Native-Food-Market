import {combineReducers} from 'redux';
import {registerReducer, photoReducer} from './auth';
import {globalReducer} from './global';
import {homeReducer, mapsReducer} from './home';
import {orderReducer, countReducer, cartReducer} from './order';

const reducer = combineReducers({
  registerReducer,
  globalReducer,
  photoReducer,
  homeReducer,
  orderReducer,
  mapsReducer,
  countReducer,
  cartReducer,
});

export default reducer;
