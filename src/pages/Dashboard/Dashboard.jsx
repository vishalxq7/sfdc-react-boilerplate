import React, { useState } from 'react';
import {
	CategoryTab,
	Currency,
	ResourcesButton,
	ProductList,
} from '../../components';

export const Dashboard = () => {
	const [category, setCategory] = useState('');
	const [search, setSearch] = useState('');
	const [currency, setCurrency] = useState('');
	const [filters, setFilters] = useState([]);

	return (
		<div>
			<div className="container mt-5">
				<CategoryTab onSelect={setCategory} />
				<input
					className="form-control mt-3"
					placeholder="Search product..."
					onChange={setSearch}
				/>
				<Currency onChange={setCurrency} />
				<ResourcesButton onChange={setFilters} />
				<ProductList
					categoryId={category}
					search={search}
					currency={currency}
					activeFilters={filters}
				/>
			</div>
		</div>
	);
};
