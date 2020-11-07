// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

const schema = new mongoose.Schema({
    name: {
        first: {
            type:     String,
            required: true,
        },
        last: {
            type:     String,
            required: true,
        },
    },
    phones: [
        {
            phone: {
                type:     String,
                required: true,
            },
            primary: Boolean,
        },
    ],
    emails: [
        {
            email: {
                type:     String,
                required: true,
                unique:   true,
            },
            primary: Boolean,
        },
    ],
    password: {
        type:     String,
        select:   false,
        required: true,
    },
    sex: {
        type:     String,
        enum:     [ 'm', 'f' ],
        required: true,
    },
    roles: [
        {
            type:    String,
            default: 'newbie',
            enum:    [ 'newbie', 'student', 'teacher' ],
        },
    ],
    socials: {
        facebook: String,
        linkedin: String,
        github:   String,
        skype:    String,
    },
    notes: String,
    hash:  {
        type:     String,
        required: true,
        unique:   true,
        default:  () => v4(),
    },
    disabled: Boolean,
    created:  Date,
    modified: Date,
});

schema.index({
    'name.first': 1,
    'name.last':  1,
}, {
    name: 'flName',
});
schema.index({
    notes: 'text',
}, {
    name: 'notes',
});

const users = mongoose.model('users', schema);

users.createIndexes();

export { users };
