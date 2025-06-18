import { api } from '../utils/apiHelper';

export const getCurrenciesData = async () => {
	try {
		const response = await api.get('/currencies');
		if (!response || !response.data) {
			throw new Error('No data received from the API');
		}
		return response.data;
	} catch (error) {
		throw new Error('Error fetching categories data: ' + error.message);
	}
};
