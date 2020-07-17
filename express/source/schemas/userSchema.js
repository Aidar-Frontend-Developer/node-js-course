export const createUser = {
    type:       'object',
    properties: {
        name: {
            type:      'string',
            minLength: 3,
        },
        email: {
            type:   'string',
            format: 'email',
        },
        phone: {
            type: 'string',
        },
        password: {
            type:      'string',
            minLength: 3,
        },
        sex: {
            type: 'string',
            enum: [ 'm', 'f' ],
        },
        role: {
            type: 'string',
            enum: [ 'newbie', 'student', 'teacher' ],
        },
    },
    required:             [ 'name', 'email', 'phone', 'password', 'sex' ],
    additionalProperties: false,
};
