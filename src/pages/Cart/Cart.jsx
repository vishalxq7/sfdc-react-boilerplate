import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, addItem } from '../../store/modules/cartSlice';

export const Cart = () => {
	const cartItems = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();

	const handleRemoveFromCart = (id) => {
		console.log('Removing item with id:', id);
		dispatch(removeItem(id));
	};

	return (
		<div>
			<h2>Your Cart</h2>

			<button
				onClick={() => {
					dispatch(addItem({ id: 2, quantity: 1, name: 'Product 2' }));
				}}
			>
				Add to Cart{' '}
			</button>

			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<ul>
					{cartItems.map((item) => (
						<li key={item.id}>
							{item.name} - ${item.price}
							<button onClick={() => handleRemoveFromCart(item.id)}>
								Remove
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
