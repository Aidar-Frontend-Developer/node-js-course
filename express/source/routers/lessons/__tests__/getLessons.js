// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
describe('getLessons request:', () => {
    test('should return 200 for getting all lessons', async (done) => {
        const response = await server.get('/api/lessons');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 for getting all lessons and data should be an array', async (done) => {
        const response = await server.get('/api/lessons');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
