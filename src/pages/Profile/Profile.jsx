import React from 'react';
import { useAuth } from '../../hooks';

export const Profile = () => {
	const { auth } = useAuth();

	return (
		<div>
			<h1>Profile Page</h1>
			<div className="pt-2">
				<pre>{JSON.stringify(auth, null, 4)}</pre>
			</div>
		</div>
	);
};
