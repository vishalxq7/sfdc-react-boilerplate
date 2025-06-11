const isProduction = import.meta.env.NODE_ENV === 'production';

const formatMessage = (level, message, data) => {
	const timestamp = new Date().toISOString();
	return {
		timestamp,
		level,
		message,
		...(data && { data }),
	};
};

// const sendToServer = async (message, data) => {
// 	try {
// 		console.log('error data>>>', data);

// 		// await fetch('/api/logs', {
// 		// 	method: 'POST',
// 		// 	headers: { 'Content-Type': 'application/json' },
// 		// 	body: JSON.stringify(logData),
// 		// });
// 	} catch (err) {
// 		console.error('Failed to send log to server', err);
// 	}
// };

export const logger = {
	info: (message, data) => {
		if (!isProduction) {
			console.info(formatMessage('INFO', message, data));
		}
	},

	warn: (message, data) => {
		if (!isProduction) {
			console.warn(formatMessage('WARN', message, data));
		}
	},

	error: (message, data) => {
		console.error(formatMessage('ERROR', message, data));
		// Save to db or any other location.
		// sendToServer(message, data);
	},

	debug: (message, data) => {
		if (!isProduction) {
			console.debug(formatMessage('DEBUG', message, data));
		}
	},
};
