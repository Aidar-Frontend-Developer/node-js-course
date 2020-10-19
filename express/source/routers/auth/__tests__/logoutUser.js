// Core
import request from 'supertest';
import { internet } from 'faker';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
const email = Buffer.from(internet.email()).toString('base64');
const password = Buffer.from(internet.password()).toString('base64');

let token = '';

describe('logoutUser request:', () => {
    beforeAll(async (done) => {
        const response = await server.post('/api/auth/login')
            .set('Authorization', password)
            .send({ email, password });

        token = response.headers[ 'x-token' ];
        done();
    });

    test('should logout user and return 204 status', async (done) => {
        const response = await server.post('/api/auth/logout')
            .set('Authorization', password)
            .set('X-Token', token);

        expect(response.statusCode).toBe(204);
        done();
    });
});
