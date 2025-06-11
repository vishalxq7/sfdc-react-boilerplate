import { useEffect } from 'react';

export const useTitle = (title) => {
	useEffect(() => {
		const prevTitle = document.title;
		const newTitle = title ? `${title} | Salesforce` : 'Salesforce';
		document.title = newTitle;

		return () => {
			document.title = prevTitle;
		};
	}, [title]);
};
