import { api } from '../utils/apiHelper';

export const getCategoriesData = async () => {
	try {
		const response = await api.get('/categories');
		if (!response || !response.data) {
			throw new Error('No data received from the API');
		}

		return response.data;
	} catch (error) {
		throw new Error('Error fetching categories data: ' + error.message);
	}
};
