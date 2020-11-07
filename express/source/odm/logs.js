// Core
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        method: {
            type: String,
        },
        path: {
            type: String,
        },
        duration: {
            start: Date,
            end:   Date,
        },
        payload: Object,
        agent:   {
            type: String,
        },
    },
    {
        timestamp: {
            createdAt: 'created',
        },
        capped: {
            size: 50 * 1024 * 1024,
            max:  50000,
        },
    },
);

export const logs = mongoose.model('logs', schema);
