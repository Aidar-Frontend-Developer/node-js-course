// Core
import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import cors from 'cors';

// Instruments
import {
    logger,
    errorLogger,
    NotFoundError,
    notFoundLogger,
    validationLogger,
    sessionOptions,
    corsOptions,
} from './utils';

// Routers
import { auth, users, classes, lessons } from './routers';

const app = express();

app.use(helmet());
app.use(cors(corsOptions));

// Express-session middleware usage
app.use(session(sessionOptions));

app.use(express.json({ limit: '10kb' }));

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
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
    );
    next(error);
});

if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-unused-vars
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

    // eslint-disable-next-line no-unused-vars
    process.on('unhandledRejection', (error, promise) => errorLogger.error(error));

    process.on('uncaughtException', (error) => errorLogger.error(error));
}

export { app };
