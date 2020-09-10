// Core
import { EOL } from 'os';
import bodyParser from 'body-parser';
import { createTerminus } from '@godaddy/terminus';

// Instruments
import { app, server } from './server';
import {
	logger,
	errorLogger,
	getPort,
	NotFoundError,
	notFoundLogger,
	validationLogger,
} from './utils';

// Routers
import { auth, users, classes, lessons } from './routers';

const PORT = getPort();

const onSignal = () => Promise.all([server.close()]);
const onShutdown = () => console.log(`${EOL}cleanup finished, server is shutting down${EOL}`);
const options = {
	signal: 'SIGINT',
	onSignal,
	onShutdown,
};

app.use(bodyParser.json({ limit: '10kb' }));

// Logger
if (process.env.NODE_ENV === 'development') {
	app.use((req, res, next) => {
		let body = null;
		if (req.method !== 'GET') {
			body = JSON.stringify(req.body, null, 2);
		}
		logger.debug(`${req.method} ${body ? `\n${body}` : ''}`);
		next();
	});
}

// Routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/classes', classes);
app.use('/api/lessons', lessons);

app.use('*', (req, res, next) => {
	const error = new NotFoundError(
		`Can not find right route for method ${req.method} and path ${req.originalUrl}`
	);
	next(error);
});

if (process.env.NODE_ENV !== 'test') {
	app.use((error, req, res, next) => {
		const { name: errorName, message, statusCode } = error;
		const errorMessage = `${errorName}: ${message}`;

		switch (errorName) {
			case 'NotFoundError':
				notFoundLogger.error(errorMessage);
				break;

			case 'ValidationError':
				validationLogger.error(errorMessage);
				break;

			default:
				errorLogger.error(errorMessage);
				break;
		}

		res.status(statusCode || 500).json({ message });
	});

	process.on('unhandledRejection', (error, promise) => errorLogger.error(error));

	process.on('uncaughtException', (error) => errorLogger.error(error));
}

createTerminus(server, options);

server.listen(PORT, () => {
	// eslint-disable-next-line
	console.log(`Server API is up on port ${PORT}`);
});
