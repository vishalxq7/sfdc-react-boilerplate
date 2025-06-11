import { createContext, useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const AuthContext = createContext();

const authInitialState = {
	user: null,
	isLoggedIn: false,
};

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(authInitialState);
	const { authState } = useOktaAuth();

	useEffect(() => {
		if (authState && authState.isAuthenticated) {
			setAuth({
				user: authState.idToken?.claims || null,
				isLoggedIn: true,
			});
		} else {
			setAuth(authInitialState);
		}
	}, [authState]);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
