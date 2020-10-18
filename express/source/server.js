// Core
import express from 'express';
import passport from 'passport';
import { EOL } from 'os';
import session from 'express-session';
// import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GitHubStrategy } from 'passport-github2';

// Instruments
import {
    logger,
    errorLogger,
    NotFoundError,
    notFoundLogger,
    validationLogger,
    sessionOptions,
    getGithubSecrets
} from './utils';

// Routers
import { auth, users, classes, lessons } from './routers';

const app = express();

// Express-session middleware usage
// app.use(session(sessionOptions));

// JWT passport middleware usage
// passport.use(
// new JwtStrategy(jwtOptions, (jwtPayload, done) => {
// const { email } = jwtPayload;
// return done(null, { email });
// }),
// );

// GITHUB passport middleware usage
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = getGithubSecrets();

passport.use(
    new GitHubStrategy(
        {
            clientID:     GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL:  'http://127.0.0.1:3000/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                return done(null, profile);
            });
        },
    ),
);

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

export { app }
