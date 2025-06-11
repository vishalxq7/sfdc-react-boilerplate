import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { App } from './App';
import { ErrorBoundary } from 'react-error-boundary';
import { logError } from './utils/errorBoundaryLog';
import { AppError } from './pages';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ErrorBoundary fallback={<AppError />} onError={logError}>
			<App />
		</ErrorBoundary>
	</StrictMode>
);
