import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './modules/cartSlice';
import comparisonReducer from './modules/comparisonSlice';
import userReducer from './modules/userSlice';

const appReducer = combineReducers({
	cart: cartReducer,
	comparison: comparisonReducer,
	user: userReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'RESET_STORE') {
		storage.removeItem('persist:root'); // clear persisted storage
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
