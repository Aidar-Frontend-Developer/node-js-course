// Core
import request from 'supertest';
import { internet } from 'faker';

// Instruments
import { app } from '../../../../../../server';

const server = request.agent(app);
const email = Buffer.from(internet.email()).toString('base64');
const password = Buffer.from(internet.password()).toString('base64');

let token = '';

describe('getLessonKeynote request:', () => {
    beforeAll(async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Authorization', password)
            .send({ email, password });

        token = response.headers[ 'x-token' ];
        done();
    });

    test('should return 200 for getting keynote by hash', async (done) => {
        const response = await server.get('/api/lessons/1/keynotes/1')
            .set('Authorization', password)
            .set('X-Token', token);

        expect(response.statusCode).toBe(200);
        done();
    });

    test('data should be an object', async (done) => {
        const response = await server.get('/api/lessons/1/keynotes/1')
            .set('Authorization', password)
            .set('X-Token', token);
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data).toBe('object');
        done();
    });
});
