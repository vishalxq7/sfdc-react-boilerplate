import { useEffect, useState } from 'react';
import './Home.css';
import { useTitle } from '../../hooks';
import { fetchCategoryData } from '../../services/categoryApi';

export const Home = () => {
	useTitle('Home');
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const categoriesData = await fetchCategoryData();
				console.log('Category Data:', categoriesData);
				setCategories(categoriesData);
			} catch (error) {
				console.error('Fetch error:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="pt-4">
			<h1>This is Home Component</h1>
			<p>Category Data</p>
			<pre>{JSON.stringify(categories, null, 4)}</pre>
		</div>
	);
};
