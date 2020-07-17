export const expelStudent = {
    type:       'object',
    properties: {
        user: {
            type: 'string',
        },
    },
    required:             [ 'user' ],
    additionalProperties: false,
};
