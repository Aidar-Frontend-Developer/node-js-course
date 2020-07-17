export const enrollStudent = {
    type:       'object',
    properties: {
        user: {
            type: 'string',
        },
        status: {
            type: 'string',
            enum: [ 'standard', 'select', 'premium' ],
        },
        notes: {
            type: 'string',
        },
    },
    required:             [ 'user', 'status' ],
    additionalProperties: false,
};
