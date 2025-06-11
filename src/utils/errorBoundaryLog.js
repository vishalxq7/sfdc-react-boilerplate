import { logger } from './logger';
export const logError = (error, info) => {
	logger.error('Something went Wrong', { error: error, info: info });
};
