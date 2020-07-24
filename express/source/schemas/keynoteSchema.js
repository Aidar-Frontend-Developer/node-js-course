export const createKeynote = {
    type:       'object',
    properties: {
        title: {
            type:      'string',
            minLength: 3,
        },
        order: {
            type:    'integer',
            minimum: 1,
            maximum: 9999,
        },
        uri: {
            type:   'string',
            format: 'uri',
        },
    },
    required:             [ 'title', 'order', 'uri' ],
    additionalProperties: false,
};
