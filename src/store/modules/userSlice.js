import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			console.log('Setting user:', action.payload);
			// state.user = action.payload;
			state.user.push({
				...action.payload,
			});
		},
		clearUser: (state) => {
			console.log('Clearing user data');
			state.user = [];
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
