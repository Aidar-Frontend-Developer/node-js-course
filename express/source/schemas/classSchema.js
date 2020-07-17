export const createClass = {
    type:       'object',
    properties: {
        title: {
            type:      'string',
            minLength: 3,
        },
        description: {
            type:      'string',
            minLength: 3,
        },
        order: {
            type:    'integer',
            minimum: 1,
            maximum: 9999,
        },
        duration: {
            type:       'object',
            properties: {
                started: {
                    type:   'string',
                    format: 'date-time',
                },
                closed: {
                    type:   'string',
                    format: 'date-time',
                },
            },
        },
    },
    required:             [ 'title', 'description', 'order', 'duration' ],
    additionalProperties: false,
};
