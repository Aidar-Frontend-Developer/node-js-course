// Core
import express from 'express';
import bodyParser from 'body-parser';

//Routers
import { auth, users, classes, lessons } from './routers';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/classes', classes);
app.use('/api/lessons', lessons);

export { app };
