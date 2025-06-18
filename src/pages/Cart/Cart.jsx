import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { persistor } from '../../store';
import { CartItem } from '../../components';

export const Cart = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItems);

	const resetStore = () => {
		dispatch({ type: 'RESET_STORE' });
		persistor.purge();
	};

	return (
		<div>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div className="container">
					<div className="d-flex gap-4">
						<h3>Pricing Scratchpad</h3>
						<button className="btn btn-danger btn-sm" onClick={resetStore}>
							Reset Store
						</button>
					</div>

					<div className="d-flex justify-content-between align-items-center mb-3">
						<div>
							<label className="form-label me-2">Edition:</label>
							<select className="form-select d-inline w-auto">
								<option>Enterprise</option>
								<option>Unlimited</option>
								<option>Professional</option>
							</select>
						</div>
						<div>
							<button className="btn btn-secondary me-2">Apply FMV</button>
							<div className="btn-group me-2" role="group">
								<button
									type="button"
									className="btn btn-outline-primary active"
								>
									Monthly
								</button>
								<button type="button" className="btn btn-outline-primary">
									Annual
								</button>
							</div>
							<span>Currency: JPY (¥)</span>
						</div>
					</div>
					<CartItem data={cartItems} />
				</div>
			)}
		</div>
	);
};
