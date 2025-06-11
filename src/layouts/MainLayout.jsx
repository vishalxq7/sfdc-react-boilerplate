import { Outlet, useLocation } from 'react-router';
import { Footer, Header } from '../components';
import { ModalBox } from '../components';
import { useInactivityLogout } from '../hooks';

const MainLayout = () => {
	const { modalOpen, handleLogout, handleStay } = useInactivityLogout(15);

	// do't show header and footer on the root path
	// this is useful for login and signup pages
	const location = useLocation();
	const hideLayout = location.pathname === '/login';

	return (
		<>
			{/* common modal for logout in activity functionality */}
			<ModalBox
				isOpen={modalOpen}
				title="Session Timeout"
				onClose={handleStay}
				footer={
					<>
						<button className="btn btn-secondary" onClick={handleLogout}>
							Logout
						</button>
						<button className="btn btn-primary" onClick={handleStay}>
							Stay Signed In
						</button>
					</>
				}
			>
				<p>
					Your session is about to expire due to inactivity. Do you want to stay
					signed in?
				</p>
			</ModalBox>

			{!hideLayout && <Header />}
			<main>
				<div className="container">
					<Outlet />
				</div>
			</main>
			{!hideLayout && <Footer />}
		</>
	);
};

export default MainLayout;
