//Core
import http from 'http';
import { createTerminus } from '@godaddy/terminus';

// Instruments
import { app } from './server';
import { getPort } from './utils';

const PORT = getPort();

const server = http.createServer(app);

const onSignal = () => {
    return Promise.all([ server.close() ]);
};

const onShutdown = () => {
    console.log('\ncleanup finished, server is shutting down\n');
};

const options = {
    signal: 'SIGINT',
    onSignal,
    onShutdown,
};

createTerminus(server, options);

server.listen(PORT, () => {
    console.log(`Server API is up on port ${PORT}`);
});
