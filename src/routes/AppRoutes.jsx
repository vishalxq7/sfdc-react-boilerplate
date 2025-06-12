import { Route, Routes, useNavigate } from 'react-router';
import {
	Cart,
	Contact,
	Dashboard,
	Home,
	Login,
	NotFound,
	Profile,
} from '../pages';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// src/App.js
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { AuthProvider } from '../context/AuthContext';
import { oktaConfig } from '../utils/oktaConfig';
import { Provider } from 'react-redux';
import store from '../store';

const AppRoutes = () => {
	const navigate = useNavigate();

	const oktaAuth = new OktaAuth(oktaConfig);

	const restoreOriginalUri = async (_oktaAuth, originalUri) => {
		navigate(toRelativeUrl(originalUri, window.location.origin), {
			replace: true,
		});
	};

	return (
		<Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
			<AuthProvider>
				<Provider store={store}>
					<Routes>
						<Route element={<MainLayout />}>
							<Route path="/login" element={<Login />} />
							<Route path="/login/callback" element={<LoginCallback />} />

							<Route path="/" element={<Home />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/cart" element={<Cart />} />

							{/* <Route element={<ProtectedRoute />}>
							<Route path="/" element={<Home />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/profile" element={<Profile />} />
						</Route> */}
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Provider>
			</AuthProvider>
		</Security>
	);
};

export default AppRoutes;
