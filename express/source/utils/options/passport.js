// Core
import { ExtractJwt } from 'passport-jwt';

// Instruments
import { getPassword } from '../env';

export const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:    getPassword(),
};
