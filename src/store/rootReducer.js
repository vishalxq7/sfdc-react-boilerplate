import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './modules/cartSlice';

const rootReducer = combineReducers({
	cart: cartReducer,
});

export default rootReducer;
