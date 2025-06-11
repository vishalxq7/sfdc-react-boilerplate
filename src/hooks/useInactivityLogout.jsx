import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Session } from '../utils/session';
import { logger } from '../utils/logger';
import { useOktaAuth } from '@okta/okta-react';

export const useInactivityLogout = (timeoutMinutes = 15) => {
	const { oktaAuth } = useOktaAuth();

	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);

	const handleLogout = useCallback(() => {
		setModalOpen(false);
		Session.clear();
		oktaAuth.signOut();
		// navigate('/login');
	}, [navigate]);

	const handleStay = useCallback(() => {
		setModalOpen(false);
		Session.setActivity();
	}, []);

	useEffect(() => {
		const updateActivity = () => Session.setActivity();
		const checkTimeout = () => {
			logger.info('Checking user activity timeout...');
			const now = Date.now();
			const last = Session.getActivity();

			if (now - last > timeoutMinutes * 60000) {
				logger.info('User inactive for more than', timeoutMinutes);
				setModalOpen(true);
			}

			// if (Session.getToken() && now - last > timeoutMinutes * 60000) {
			// 	setModalOpen(true);
			// }
		};

		window.addEventListener('mousemove', updateActivity);
		window.addEventListener('keydown', updateActivity);

		updateActivity();
		const interval = setInterval(checkTimeout, 60000);

		return () => {
			clearInterval(interval);
			window.removeEventListener('mousemove', updateActivity);
			window.removeEventListener('keydown', updateActivity);
		};
	}, [timeoutMinutes]);

	return { modalOpen, handleLogout, handleStay };
};
