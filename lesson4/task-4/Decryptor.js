const { Transform } = require('stream');
const crypto = require('crypto');

const config = require('./config');

class Decryptor extends Transform {
  constructor(
    options = {
      objectMode: true,
    }
  ) {
    super(options);
  }

  _transform(chunk, encoding, done) {
    this.push(this._decryptObject(chunk));
    done();
  }

  _decryptObject(object) {
    const { payload, meta } = object;

    payload.email = this._decrypt(payload.email, meta.algorithm);
    payload.password = this._decrypt(payload.password, meta.algorithm);

    return {
      source: 'guardian',
      meta,
      payload,
    };
  }

  _flush(done) {
    done();
  }

  _decrypt(text, meta) {
    const decipher = crypto.createDecipher(config.algorithm, config.password);

    let deciphered = decipher.update(text, meta, 'utf8');

    deciphered += decipher.final('utf8');

    return deciphered;
  }
}

module.exports = Decryptor;
