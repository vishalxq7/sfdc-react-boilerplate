import { Navigate, Outlet } from 'react-router';
import { useOktaAuth } from '@okta/okta-react';

const ProtectedRoute = () => {
	const { authState } = useOktaAuth();
	if (!authState) {
		// Show a loading indicator while auth state is being determined
		return <div>Loading...</div>;
	}
	return authState?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
