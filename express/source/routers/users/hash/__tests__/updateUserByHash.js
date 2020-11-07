// Core
import request from 'supertest';
import { internet } from 'faker';

// Instruments
import { app } from '../../../../server';

const server = request.agent(app);
const email = Buffer.from(internet.email()).toString('base64');
const password = Buffer.from(internet.password()).toString('base64');

let token = '';


const getLesson = () => ({
    title:        'test',
    description:  'test',
    order:        1,
    availability: [ 'standard', 'select', 'premium' ],
});

describe('updateUserByHash request:', () => {
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
            .put('/api/lessons/1')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({});

        expect(response.statusCode).toBe(400);
        done();
    });

    test('should return status code 200', async (done) => {
        const response = await server
            .put('/api/lessons/1')
            .set('Authorization', password)
            .set('X-Token', token)
            .send(getLesson());

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return object', async (done) => {
        const response = await server
            .put('/api/lessons/1')
            .set('Authorization', password)
            .set('X-Token', token)
            .send(getLesson());
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});
