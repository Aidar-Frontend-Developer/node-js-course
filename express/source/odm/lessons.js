// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

const contentSchema = new mongoose.Schema({
    title: {
        type:      String,
        maxlength: 30,
    },
    order: {
        type: Number,
        min:  0,
    },
    uri: {
        type:  String,
        match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    },
});

const schema = new mongoose.Schema(
    {
        title: {
            type:      String,
            required:  true,
            maxlength: 30,
        },
        description: {
            type:      String,
            required:  true,
            maxlength: 250,
        },
        order: {
            type:     Number,
            required: true,
        },
        hash: {
            type:     String,
            required: true,
            unique:   true,
            default:  () => v4(),
        },
        availability: [
            {
                type: String,
                enum: [ 'standard', 'select', 'premium' ],
            },
        ],
        content: {
            videos:   [ contentSchema ],
            keynotes: [ contentSchema ],
        },
    },
    {
        timestamp: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

schema.index(
    {
        order: 1,
    },
    {
        name: 'order',
    },
);

const lessons = mongoose.model('lessons', schema);

lessons.createIndexes();

export { lessons };
