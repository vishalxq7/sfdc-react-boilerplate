import React from 'react';
import './CartItem.css';
import { removeFromCart } from '../../store/modules/cartSlice';
import { useDispatch } from 'react-redux';

export const CartItem = ({ data }) => {
	const dispatch = useDispatch();
	const removeProduct = (id) => {
		console.log('proid>>>', id);
		dispatch(removeFromCart(id));
	};

	return (
		<>
			<div>CartItem</div>
			<table className="table text-center align-middle">
				<thead className="table-light">
					<tr>
						<th className="col-product">Products</th>
						<th className="col-dam">View DAM</th>
						<th className="col-price">List Price</th>
						<th className="col-qty">Quantity</th>
						<th className="col-disc">Discount (%)</th>
						<th className="col-disc-price">Discounted Price</th>
						<th className="col-approval">Approval Level</th>
						<th className="col-cmv">Pricing Guidance</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((product) => (
							<>
								<tr>
									<td>{product.name}</td>
									<td>
										<button
											className="btn btn-sm btn-link"
											data-bs-toggle="collapse"
											data-bs-target={`#dam${product.id}`}
										>
											View DAM
										</button>
									</td>
									<td>{product.monthlyPrice}</td>
									<td>
										<input
											type="text"
											name="qty"
											className="form-control"
											id={`qty${product.id}`}
										/>
									</td>
									<td>
										<input
											type="text"
											name="discount"
											className="form-control"
											id={`discount${product.id}`}
										/>
									</td>
									<td>¥132,000.00</td>
									<td>Level 5</td>
									<td>—</td>
									<td>
										<span
											onClick={() => {
												removeProduct(product.id);
											}}
										>
											<i className="bi bi-trash"></i>
										</span>
									</td>
								</tr>
								<tr className="collapse" id={`dam${product.id}`}>
									<td></td>
									<td></td>
									<td></td>
									<td colspan="6">
										<div className="table-responsive">
											<table className="table text-start">
												<thead className="table-light">
													<tr>
														<th># of Subscribers</th>
														<th>Level 0</th>
														<th>Level 1</th>
														<th>Level 2</th>
														<th>Level 3</th>
														<th>Level4</th>
													</tr>
												</thead>
												<tbody>
													{product.productDiscountMatrix &&
														product.productDiscountMatrix.map(
															(matrix, index) => (
																<tr key={index}>
																	<td>{matrix.subscribers}</td>
																	<td>{matrix.level_0}</td>
																	<td>{matrix.level_1}</td>
																	<td>{matrix.level_2}</td>
																	<td>{matrix.level_3}</td>
																	<td>{matrix.level_4 || '-'}</td>
																</tr>
															)
														)}
												</tbody>
											</table>
										</div>
									</td>
								</tr>
							</>
						))}
				</tbody>
			</table>
		</>
	);
};
