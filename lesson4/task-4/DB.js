const { EventEmitter } = require('events');
const crypto = require('crypto');

const db = new (class DB extends EventEmitter {
  constructor(props) {
    super(props);
    this.users = [];
    this.on('add', this._addListener);
    this.on('get', this._getListener);
    this.on('get-all', this._getAllListener);
  }

  _addListener(user) {
    const id = crypto.randomBytes(16).toString('hex');

    this.users.push({
      ...user,
      id,
    });
  }

  _getListener(userId, cb) {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      throw new Error(`No such user with id: ${userId}`);
    }

    this._validateCallBack(cb);

    cb(user);
  }

  _getAllListener(cb) {
    this._validateCallBack(cb);

    cb(this.users);
  }

  _validateCallBack(cb) {
    if (typeof cb !== 'function') {
      throw new TypeError(`cb is not a function`);
    }
  }
})();

module.exports = db;
