// Core
import mongoose from 'mongoose';

// Base model
import { user } from './base';

const students = user.discriminator(
    'students',
    new mongoose.Schema(
        {
            socials: {
                facebook: {
                    type:  String,
                    match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                },
                linkedin: {
                    type:  String,
                    match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                },
                github: {
                    type:  String,
                    match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                },
                skype: {
                    type:  String,
                    match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                },
            },
            roles: [
                {
                    type:    String,
                    default: 'newbie',
                    enum:    [ 'newbie', 'student' ],
                },
            ],
            notes: {
                type:      String,
                maxlength: 250,
            },
        },
        { discriminatorKey: 'model' },
    ),
);

export { students };
