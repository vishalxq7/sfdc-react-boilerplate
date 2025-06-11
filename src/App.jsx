import './styles/global.css';
import { BrowserRouter } from 'react-router';
// import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import { Session } from './utils/session';

export function App() {
	useEffect(() => {
		Session.setActivity();
	}, []);

	return (
		<>
			<div>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</div>
		</>
	);
}
