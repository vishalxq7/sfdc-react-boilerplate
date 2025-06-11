import { Route, Routes, useNavigate } from 'react-router';
import { Contact, Dashboard, Home, Login, NotFound, Profile } from '../pages';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// src/App.js
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { AuthProvider } from '../context/AuthContext';
import { oktaConfig } from '../utils/oktaConfig';

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
				<Routes>
					<Route element={<MainLayout />}>
						<Route path="/login" element={<Login />} />
						<Route path="/login/callback" element={<LoginCallback />} />

						<Route path="/" element={<Home />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/profile" element={<Profile />} />

						{/* <Route element={<ProtectedRoute />}>
							<Route path="/" element={<Home />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/profile" element={<Profile />} />
						</Route> */}
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</Security>
	);
};

export default AppRoutes;
