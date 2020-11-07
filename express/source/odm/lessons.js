// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

const contentSchema = new mongoose.Schema({
    title: String,
    order: Number,
    uri:   String,
});

const schema = new mongoose.Schema({
    title: {
        type:     String,
        required: true,
    },
    description: {
        type:     String,
        required: true,
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
    created:  Date,
    modified: Date,
});

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
