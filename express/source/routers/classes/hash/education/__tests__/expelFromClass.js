// Core
import request from 'supertest';
import { internet } from 'faker';
// Instruments
import { app } from '../../../../../server';

const server = request.agent(app);
const email = Buffer.from(internet.email()).toString('base64');
const password = Buffer.from(internet.password()).toString('base64');

let token = '';

describe('expelFromClass request:', () => {
    beforeAll(async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Authorization', password)
            .send({ email, password });

        token = response.headers[ 'x-token' ];
        done();
    });

    test('should return status code 400', async (done) => {
        const response = await server
            .post('/api/classes/1/expel')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({});

        expect(response.statusCode).toBe(400);
        done();
    });

    test('should return status code 204', async (done) => {
        const response = await server
            .post('/api/classes/1/expel')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({
                user: 'user',
            });

        expect(response.statusCode).toBe(204);
        done();
    });
});
