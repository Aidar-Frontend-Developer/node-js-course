// Core
import request from 'supertest';
import { name, internet, phone } from 'faker';

// Instruments
import { app } from '../../../../server';

const server = request.agent(app);
const email = Buffer.from(internet.email()).toString('base64');
const password = Buffer.from(internet.password()).toString('base64');

let token = '';

const getUser = () => ({
    name:     `${name.firstName()} ${name.lastName()}`,
    email:    internet.email(),
    phone:    phone.phoneNumber(),
    password: internet.password(),
    sex:      'm',
});

describe('updateLessonByHash request:', () => {
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
            .put('/api/users/1')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({});

        expect(response.statusCode).toBe(400);
        done();
    });

    test('should return status code 200', async (done) => {
        const response = await server
            .put('/api/users/1')
            .set('Authorization', password)
            .set('X-Token', token)
            .send(getUser());

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return object', async (done) => {
        const response = await server
            .put('/api/users/1')
            .set('Authorization', password)
            .set('X-Token', token)
            .send(getUser());
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});
