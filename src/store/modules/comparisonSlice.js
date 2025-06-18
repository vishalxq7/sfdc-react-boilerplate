import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const comparisonSlice = createSlice({
	name: 'comparison',
	initialState,
	reducers: {
		addToCompare: (state, action) => {
			action.payload.forEach((product) => {
				const existing = state.items.find((item) => item.id === product.id);

				if (existing) {
					existing.quantity += 1;
				} else {
					state.items.push({ ...product, quantity: 1 });
				}
			});
		},

		removeFromCompare: (state, action) => {
			console.log('Removing item from comparison:', action.payload);
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		clearComparison: (state) => {
			state.items = [];
		},
	},
});

export const { addToCompare, removeFromCompare, clearComparison } =
	comparisonSlice.actions;
export default comparisonSlice.reducer;
