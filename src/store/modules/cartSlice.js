import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			console.log('Adding item to cart:', action.payload);
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.quantity += action.payload.quantity;
			} else {
				state.items.push({
					...action.payload,
					quantity: action.payload.quantity,
				});
			}
		},
		removeItem: (state, action) => {
			console.log('Removing item from cart:', action.payload);
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		updateItem: (state, action) => {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.quantity = action.payload.quantity;
			}
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, updateItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
