const { Transform } = require('stream');
const crypto = require('crypto');

class Guardian extends Transform {
  constructor(options = { objectMode: true }) {
    super(options);
  }

  _transform(chunk, encoding, done) {
    this.push(this._createHashObject(chunk));
    done();
  }

  _createHashObject(object) {
    object.email = crypto
      .createHash('sha256')
      .update(object.email)
      .digest('hex');

    object.password = crypto
      .createHash('sha256')
      .update(object.password)
      .digest('hex');

    return {
      meta: {
        source: 'ui',
      },
      payload: {
        ...object,
      },
    };
  }

  _flush(done) {
    done();
  }
}

module.exports = Guardian;
