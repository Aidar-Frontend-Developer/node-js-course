
// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);

describe('loginUser request:', () => {
    test('should return 401 without authorization header', async (done) => {
        const email = 'test@gmail.com';
        const password = 'supperstrongpassword';

        const response = await server.post('/api/auth/login').send({ email, password });

        expect(response.statusCode).toBe(401);
        done();
    });

    test('should login user', async (done) => {
        const email = 'test@gmail.com';
        const password = 'supperstrongpassword';

        const response = await server
            .post('/api/auth/login')
            .set('Authorization', 'Authorization')
            .send({ email, password });

        expect(response.statusCode).toBe(204);
        done();
    });

    test('should login user and set X-Token header', async (done) => {
        const email = 'test@gmail.com';
        const password = 'supperstrongpassword';

        const response = await server
            .post('/api/auth/login')
            .set('Authorization', 'Authorization')
            .send({ email, password });


        const header = response.headers[ 'x-token' ];

        expect(header).toBeDefined();
        done();
    });

    test('should login user and set set-cookie header', async (done) => {
        const email = 'test@gmail.com';
        const password = 'supperstrongpassword';

        const response = await server
            .post('/api/auth/login')
            .set('Authorization', 'Authorization')
            .send({ email, password });

        const header = response.headers[ 'set-cookie' ];

        expect(header).toBeDefined();
        done();
    });
});
