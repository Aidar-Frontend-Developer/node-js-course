// Core
import request from 'supertest';
import { name, internet, phone } from 'faker';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);

const getUser = () => ({
    name:     `${name.firstName()} ${name.lastName()}`,
    email:    internet.email(),
    phone:    phone.phoneNumber(),
    password: internet.password(),
    sex:      'm',
});

describe('addUser request:', () => {
    test('should return status code 400', async (done) => {
        const response = await server.post('/api/users').send({});

        expect(response.statusCode).toBe(400);
        done();
    });

    test('should return status code 201', async (done) => {
        const response = await server.post('/api/users').send(getUser());

        expect(response.statusCode).toBe(201);
        done();
    });

    test('should return object', async (done) => {
        const response = await server.post('/api/users').send(getUser());
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});
