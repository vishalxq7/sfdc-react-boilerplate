import React, { useEffect, useState } from 'react';
import { getCategoriesData } from '../../services/categoryApi';
import { Loader } from '../Loader/Loader';

export const CategoryTab = ({ onSelect }) => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesData = await getCategoriesData();
				console.log('Category Data:', categoriesData);
				setCategories(categoriesData);
			} catch (error) {
				console.error('Fetch error:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchCategories();
	}, []);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<ul className="nav nav-tabs">
			{categories.map((cat) => (
				<li className="nav-item" key={cat.id}>
					<button className="nav-link" onClick={() => onSelect(cat.id)}>
						{cat.name}
					</button>
				</li>
			))}
		</ul>
	);
};
