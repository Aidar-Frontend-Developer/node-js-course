//Core
import http from 'http';
import { EOL } from 'os';
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
    // eslint-disable-next-line no-console
    console.log(`${EOL}cleanup finished, server is shutting down${EOL}`);
};

const options = {
    signal: 'SIGINT',
    onSignal,
    onShutdown,
};

createTerminus(server, options);

server.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Server API is up on port ${PORT}`);
});
