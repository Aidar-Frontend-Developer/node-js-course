// Instruments
import { NotFoundError } from '../NotFoundError';

describe('notFoundError:', () => {
    test('should throw NotFoundError', () => {
        function testNotFoundError() {
            throw new NotFoundError('test');
        }
        expect(testNotFoundError).toThrow(NotFoundError);
    });
});
