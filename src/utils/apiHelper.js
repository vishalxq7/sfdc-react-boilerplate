import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL || 'https://dummyjson.com';

const axiosInstance = axios.create({
	baseURL: apiURL,
	timeout: 10000,
});

// Helper to refresh token
const refreshToken = async () => {
	const refresh = localStorage.getItem('refreshToken');
	if (!refresh) throw new Error('No refresh token');
	const response = await axios.post(`${apiURL}/auth/refresh`, {
		refreshToken: refresh,
	});
	const { accessToken, refreshToken: newRefresh } = response.data;
	localStorage.setItem('authToken', accessToken);
	if (newRefresh) localStorage.setItem('refreshToken', newRefresh);
	return accessToken;
};

// Request interceptor for auth
axiosInstance.interceptors.request.use(
	(config) => {
		const requiresAuth = config.requiresAuth !== false;

		// console.log('requiresAuth', requiresAuth); // default: true
		if (requiresAuth) {
			// console.log('inside if block');
			const token = localStorage.getItem('authToken');
			// console.log('Token:', token);
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`;
			}
		}

		// console.log('Request Config:', config);
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor for refresh token
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry &&
			originalRequest.requiresAuth !== false
		) {
			originalRequest._retry = true;
			try {
				const newToken = await refreshToken();
				originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshErr) {
				localStorage.removeItem('authToken');
				localStorage.removeItem('refreshToken');
				return Promise.reject(refreshErr);
			}
		}
		return Promise.reject(error);
	}
);

// Retry mechanism
const retryRequest = async (fn, retries = 3, delay = 1000) => {
	console.log('Retrying request:', { retries, delay });
	try {
		return await fn();
	} catch (err) {
		if (retries <= 0) throw err;
		await new Promise((res) => setTimeout(res, delay));
		return retryRequest(fn, retries - 1, delay * 2);
	}
};

// Request handler
const request = async (method, url, data = {}, options = {}) => {
	const {
		requiresAuth = true,
		retry = false,
		retries = 3,
		delay = 1000,
		params = {},
	} = options;

	const config = {
		method,
		url,
		data: method !== 'get' && method !== 'delete' ? data : undefined,
		params,
		requiresAuth,
	};

	const exec = () => axiosInstance(config);
	return retry ? retryRequest(exec, retries, delay) : exec();
};

// API methods
export const api = {
	get: (url, options) => request('get', url, {}, options),
	post: (url, data = {}, options) => request('post', url, data, options),
	put: (url, data = {}, options) => request('put', url, data, options),
	delete: (url, options) => request('delete', url, {}, options),
};

// usege
// // GET with auth (default)
// api.get('/users');

// // POST without auth
// api.post('/login', { username, password }, { requiresAuth: false });

// // GET with retry
// api.get('/data', { retry: true, retries: 2, delay: 500 });
