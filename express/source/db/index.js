// Core
import mongoose from 'mongoose';

const mongooseOptions = {
    promiseLibrary:    global.Promise,
    poolSize:          50,
    keepAlive:         30000,
    connectTimeoutMS:  5000,
    reconnectTries:    Number.MAX_SAFE_INTEGER,
    reconnectInterval: 5000,
    useNewUrlParser:   true,
    useFindAndModify:  false,
    useCreateIndex:    true,
};

const connection = mongoose.connect('mongodb://localhost:27017/ahabibullin', mongooseOptions);

connection
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Connected to DB');
    })
    .catch(({ message }) => {
        // eslint-disable-next-line no-console
        console.error(`DB connection error: ${message}`);
    });
