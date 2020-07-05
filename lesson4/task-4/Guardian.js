const { Transform } = require('stream');
const crypto = require('crypto');

const config = require('./config');

class Guardian extends Transform {
  constructor(
    options = {
      objectMode: true,
    }
  ) {
    super(options);
  }

  _transform(chunk, encoding, done) {
    this.push(this._cryptObject(chunk));
    done();
  }

  _cryptObject(object) {
    const { payload, meta } = object;

    payload.email = this._encrypt(payload.email, meta.algorithm);
    payload.password = this._encrypt(payload.password, meta.algorithm);

    return {
      source: 'guardian',
      meta,
      payload,
    };
  }

  _flush(done) {
    done();
  }

  _encrypt(text, meta) {
    const cipher = crypto.createCipher(config.algorithm, config.password);

    let crypted = cipher.update(text, 'utf8', meta);

    crypted += cipher.final(meta);

    return crypted;
  }
}

module.exports = Guardian;
