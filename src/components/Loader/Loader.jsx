import React from 'react';
import './Loader.css';

export const Loader = () => {
	return (
		<div className="loader">
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status" />
			</div>
		</div>
	);
};
