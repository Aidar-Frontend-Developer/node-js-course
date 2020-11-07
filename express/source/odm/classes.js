// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

// Instruments
import { users, lessons } from './';

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:  users,
    },
    status: {
        type: String,
        enum: [ 'standard', 'select', 'premium' ],
    },
    expelled: Boolean,
    notes:    String,
});

const schema = new mongoose.Schema({
    title:       String,
    description: String,
    hash:        {
        type:     String,
        required: true,
        default:  () => v4(),
    },
    students: [ studentSchema ],
    lessons:  [
        {
            lesson: {
                type: mongoose.SchemaTypes.ObjectId,
                ref:  lessons,
            },
            scheduled: Date,
        },
    ],
    duration: {
        started: {
            type:     Date,
            required: true,
        },
        closed: {
            type:     Date,
            required: true,
        },
    },
    order:    Number,
    created:  Date,
    modified: Date,
});

export const classes = mongoose.model('classes', schema);
