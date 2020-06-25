const { Readable } = require('stream');

class Ui extends Readable {
  constructor(
    data = [],
    options = {
      objectMode: true,
    }
  ) {
    super(options);
    this._data = data;
    this.init();
  }

  init() {
    this.on('data', (chunk) => {
      if (typeof chunk !== 'object') {
        throw new TypeError('not a valid data type');
      }

      this._validateChunk(chunk);
    });
  }

  _read() {
    let data = this._data.shift();

    if (!data) {
      this.push(null);
    } else {
      this.push(data);
    }
  }

  _validateChunk({ meta, payload }) {
    const { algorithm } = meta;
    const { name, email, password } = payload;
    const length = Object.keys(payload).length;

    if (!name || typeof name !== 'string') {
      throw new TypeError(
        'name does not exist or contains not a valid data type'
      );
    }
    if (!email || typeof email !== 'string') {
      throw new TypeError(
        'email does not exist or contains not a valid data type'
      );
    }
    if (!password || typeof password !== 'string') {
      throw new TypeError(
        'password does not exist or contains not a valid data type'
      );
    }
    if (length !== 3) {
      throw new TypeError('data can include only name, email and password');
    }

    if (!algorithm || typeof algorithm !== 'string') {
      throw new TypeError(
        'algorithm does not exist or contains not a valid data type'
      );
    }

    if (algorithm !== 'hex' && algorithm !== 'base64') {
      throw new TypeError('algorithm should be hex or base64');
    }
  }
}

module.exports = Ui;
