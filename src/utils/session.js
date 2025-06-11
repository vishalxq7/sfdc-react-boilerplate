const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const LAST_ACTIVITY_KEY = 'lastActivity';

export const Session = {
	// Token Management
	getToken: () => localStorage.getItem(TOKEN_KEY),
	setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
	removeToken: () => localStorage.removeItem(TOKEN_KEY),

	// User Info
	getUser: () => {
		const user = localStorage.getItem(USER_KEY);
		return user ? JSON.parse(user) : null;
	},
	setUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
	removeUser: () => localStorage.removeItem(USER_KEY),

	// Activity Tracking
	setActivity: () => localStorage.setItem(LAST_ACTIVITY_KEY, Date.now()),
	getActivity: () => Number(localStorage.getItem(LAST_ACTIVITY_KEY)),

	// Clear all session
	clear: () => {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USER_KEY);
		localStorage.removeItem(LAST_ACTIVITY_KEY);
	},
};
