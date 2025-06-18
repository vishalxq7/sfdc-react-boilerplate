import { useEffect, useState } from 'react';
import { getProductsData } from '../../services/ProductApi';
import { Loader } from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/modules/cartSlice';
import { addToCompare } from '../../store/modules/comparisonSlice';

export const ProductList = ({
	categoryId,
	currency,
	activeFilters,
	search,
}) => {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedProductIds, setSelectedProductIds] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const params = {
					categoryId: categoryId || 1,
					currency,
					activeFilters,
					search,
				};

				const productsData = await getProductsData(params);
				console.log('Product Data:', productsData);
				setProducts(productsData);
			} catch (error) {
				console.error('Fetch error:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, [categoryId, currency, activeFilters, search]);

	const handleCheckboxChange = (id) => {
		setSelectedProductIds((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	const handleAddToCart = () => {
		const selectedProducts = products.filter((p) =>
			selectedProductIds.includes(p.id)
		);
		dispatch(addToCart(selectedProducts));
	};

	const handleAddToCompare = () => {
		const selectedProducts = products.filter((p) =>
			selectedProductIds.includes(p.id)
		);
		dispatch(addToCompare(selectedProducts));
	};

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="mt-3">
			<div className="d-flex gap-3">
				<h5>Products</h5>
				<button className="btn btn-warning" onClick={handleAddToCart}>
					Add to Cart
				</button>
				<button className="btn btn-primary" onClick={handleAddToCompare}>
					Add to Compare
				</button>
			</div>
			<ul className="list-group">
				{products.map((product) => (
					<li
						className="list-group-item d-flex align-items-center"
						key={product.id}
					>
						<input
							type="checkbox"
							className="form-check-input me-3"
							checked={selectedProductIds.includes(product.id)}
							onChange={() => handleCheckboxChange(product.id)}
						/>
						<span>
							<strong>{product.name}</strong> - {product.currency}
							{product.price}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};
