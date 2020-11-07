// Core
import request from 'supertest';
import { internet } from 'faker';

// Instruments
import { app } from '../../../../../../server';

const server = request.agent(app);
const email = Buffer.from(internet.email()).toString('base64');
const password = Buffer.from(internet.password()).toString('base64');

let token = '';

describe('removeVideoFromLesson request:', () => {
    beforeAll(async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Authorization', password)
            .send({ email, password });

        token = response.headers[ 'x-token' ];
        done();
    });

    test('should return 204 for remove video by hash', async (done) => {
        const response = await server.delete('/api/lessons/1/videos/1')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({});

        expect(response.statusCode).toBe(204);
        done();
    });

    test('data should be undefined', async (done) => {
        const response = await server.delete('/api/lessons/1/videos/1')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({});
        const { data } = response.body;

        expect(data).toBeUndefined();
        done();
    });
});
