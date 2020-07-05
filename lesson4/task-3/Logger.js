const { Transform } = require('stream');
const DB = require('./DB');

class Logger extends Transform {
  constructor(options = { objectMode: true }) {
    super(options);
  }

  _transform(chunk, encoding, done) {
    const data = this._createLoggerObject(chunk);

    this.push(data);

    DB.emit('add', data);

    done();
  }

  _createLoggerObject(object) {
    return {
      source: 'logger',
      payload: {
        ...object.payload,
      },
      created: new Date(),
    };
  }

  _flush(done) {
    done();
  }
}

module.exports = Logger;
