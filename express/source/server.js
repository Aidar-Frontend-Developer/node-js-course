// Core
import express from 'express';
import bodyParser from 'body-parser';

//Routers
import { auth, users, classes, lessons } from './routers';
import { logger } from './utils';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/classes', classes);
app.use('/api/lessons', lessons);

export { app };
