export const createLesson = {
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
        availability: {
            type:  'array',
            items: {
                type: 'string',
                enum: [ 'standard', 'select', 'premium' ],
            },
        },
        content: {
            type:       'object',
            properties: {
                videos: {
                    type:  'array',
                    items: {
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
                    },
                },
                keynotes: {
                    type:  'array',
                    items: {
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
                    },
                },
            },
        },
    },
    required:             [ 'title', 'description', 'order', 'availability' ],
    additionalProperties: false,
};
