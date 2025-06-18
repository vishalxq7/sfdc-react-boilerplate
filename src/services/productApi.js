import { api } from '../utils/apiHelper';

export const getProductsData = async (params) => {
	try {
		// console.log('inside api call Fetching products with params:', params);
		const response = await api.get(`/products?categoryId=${params.categoryId}`);
		// console.log('Response from API:', response);
		if (!response || !response.data) {
			throw new Error('No data received from the API');
		}
		return response.data;
	} catch (error) {
		throw new Error('Error fetching products data: ' + error.message);
	}
};
