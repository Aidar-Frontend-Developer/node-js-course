const Ui = require('./Ui');
const Guardian = require('./Guardian');
const AccountManager = require('./AccountManager');
const Logger = require('./Logger');
const DB = require('./DB');
const Decryptor = require('./Decryptor');

const customers = [
  {
    payload: {
      name: 'Pitter Black',
      email: 'pblack@email.com',
      password: 'pblack_123',
    },
    meta: {
      algorithm: 'hex',
    },
  },
  {
    payload: {
      name: 'Oliver White',
      email: 'owhite@email.com',
      password: 'owhite_456',
    },
    meta: {
      algorithm: 'hex',
    },
  },
];

const ui = new Ui(customers);
const guardian = new Guardian();
const manager = new AccountManager();
const logger = new Logger();
const decryptor = new Decryptor();

ui.pipe(guardian)
  .pipe(logger)
  .pipe(decryptor)
  .pipe(manager)
  .on('finish', () =>
    DB.emit('get-all', (data) => {
      console.log(data);
    })
  );
