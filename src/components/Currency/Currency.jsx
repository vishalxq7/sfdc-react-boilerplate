import React, { useEffect, useState } from 'react';
import { getCurrenciesData } from '../../services/currencyApi';
import { Loader } from '../Loader/Loader';

export const Currency = ({ onChange }) => {
	const [currencies, setCurrencies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const currenciesData = await getCurrenciesData();
				console.log('Currency Data:', currenciesData);
				setCurrencies(currenciesData);
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
		<select
			className="form-select mt-3"
			onChange={(e) => onChange(e.target.value)}
		>
			<option value="">All Currencies</option>
			{currencies.map((cur) => (
				<option key={cur.id} value={cur.id}>
					{cur.name}
				</option>
			))}
		</select>
	);
};
