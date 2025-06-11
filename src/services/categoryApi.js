import { api } from '../utils/apiHelper';

export const fetchCategoryData = async () => {
	try {
		const response = await api.get('/products/categories');
		return response.data;
	} catch (error) {
		throw new Error('Error fetching categories data: ' + error.message);
	}
};
