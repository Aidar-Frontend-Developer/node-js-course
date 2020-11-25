// Core
import mongoose from 'mongoose';

// Base model
import { classes } from './';
import { user } from './base';

const staff = user.discriminator(
    'staff',
    new mongoose.Schema(
        {
            role: {
                type: String,
                enum: [ 'admin', 'teacher', 'mentor' ],
            },
            image: {
                type: String,
            },
            classes: {
                type: mongoose.SchemaTypes.ObjectId,
                ref:  classes,
            },
            started: {
                type: Date,
            },
        },
        { discriminatorKey: 'model' },
    ),
);

export { staff };
