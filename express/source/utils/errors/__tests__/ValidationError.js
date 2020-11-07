// Instruments
import { ValidationError } from '../ValidationError';

describe('validationError:', () => {
    test('should throw ValidationError', () => {
        function testValidationError() {
            throw new ValidationError('test');
        }
        expect(testValidationError).toThrow(ValidationError);
    });
});
