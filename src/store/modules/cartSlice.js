import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartItems: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			action.payload.forEach((product) => {
				const existing = state.cartItems.find((item) => item.id === product.id);

				if (existing) {
					existing.quantity += 1;
				} else {
					state.cartItems.push({ ...product, quantity: 1 });
				}
			});
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== action.payload
			);
		},
		updateQuantity: (state, action) => {
			const { id, quantity } = action.payload;
			const item = state.cartItems.find((item) => item.id === id);
			console.log(item, quantity);
			// if (item) item.quantity = quantity;
		},
		clearCart: (state) => {
			state.cartItems = [];
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
