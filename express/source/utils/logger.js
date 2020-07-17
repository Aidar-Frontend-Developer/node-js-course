// Core
import winston from 'winston';
import { EOL } from 'os';
const {
    format: { printf, combine, metadata, colorize },
} = winston;

const log = winston.createLogger({
    level:      'debug',
    format:     combine(metadata({ fillExcept: [ 'message' ] })),
    transports: [
        new winston.transports.Console({
            level:  'debug',
            format: combine(
                colorize(),
                printf((info) => info.message),
            ),
        }),
    ],
    exitOnError: false,
});

export const logger = (req, res, next) => {
    log.debug(
        `Request method: ${req.method}${EOL}Request time: ${[ new Date() ]}${EOL}Payload: ${JSON.stringify(req.body, null, 4)}`,
    );
    next();
};
