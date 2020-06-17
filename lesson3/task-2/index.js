const EventEmitter = require('events').EventEmitter;
const crypto = require('crypto');

class Bank extends EventEmitter {
  constructor() {
    super();

    this.persons = [];

    this.on('get', this._getListener);
    this.on('send', this._sendListener);
    this.on('error', this._errorListener);
  }

  _getPerson(personId) {
    const person = this.persons.find(({ id }) => personId === id);

    if (!person) {
      this.emit('error', new Error(`No such user with id: ${personId}`));
    }

    return person;
  }

  _addAmount(currentPerson, amount) {
    currentPerson.balance += amount;

    this.persons = this.persons.map((person) =>
      person.id === currentPerson.id ? currentPerson : person
    );
  }

  _removeAmount(currentPerson, amount) {
    if (currentPerson.balance - amount < 0) {
      this.emit(
        'error',
        new TypeError(
          `Unable to remove the amount from user: ${currentPerson.id}`
        )
      );
    } else {
      currentPerson.balance -= amount;

      this.persons = this.persons.map((person) =>
        person.id === currentPerson.id ? currentPerson : person
      );

      return true;
    }

    return false;
  }

  _validatePerson({ name, balance }) {
    if (!name || typeof name !== 'string') {
      throw new TypeError(
        'name does not exist or contains not a valid data type'
      );
    }

    if (typeof balance !== 'number') {
      throw new TypeError(
        'balance does not exist or contains not a valid data type'
      );
    }
  }

  _validateBalance(balance) {
    if (balance <= 0) {
      throw new Error('Unable to add user with negative or zero balance');
    }
  }

  _validateCallBack(cb) {
    if (typeof cb !== 'function') {
      this.emit('error', new TypeError(`cb is not a function`));

      return null;
    }

    return cb;
  }

  _validateAmount(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      this.emit(
        'error',
        new TypeError(
          `Unable to add for user negative or zero balance or contains not a valid data type`
        )
      );

      return null;
    }

    return amount;
  }

  _validatePersonNameExistance(personName) {
    const person = this.persons.find(({ name }) => name === personName);

    this.on('error', () => {
      if (person) {
        throw new TypeError(`User already exist. User name: ${personName}`);
      }
    });
  }

  register(person) {
    this._validatePerson(person);
    this._validatePersonNameExistance(person.name);
    this._validateBalance(person.balance);

    const id = crypto.randomBytes(16).toString('hex');

    this.persons.push({ ...person, id });
    return id;
  }

  _getListener(personId, cb) {
    const currentPerson = this._getPerson(personId);
    cb = this._validateCallBack(cb);

    if (cb) {
      cb(currentPerson.balance);
    }
  }

  _sendListener(personFirstId, personSecondId, amount) {
    const firstPerson = this._getPerson(personFirstId);
    const secondPerson = this._getPerson(personSecondId);
    amount = this._validateAmount(amount);

    if (amount) {
      if (this._removeAmount(firstPerson, amount)) {
        this._addAmount(secondPerson, amount);
      }
    }
  }

  _errorListener(error) {
    if (error.name === 'TypeError') {
      console.error(
        `Received ${error.name} with a message: '${error.message}'`
      );
    } else if (error.name === 'Error') {
      throw error;
    }
  }
}

const bank = new Bank();

const personFirstId = bank.register({
  name: 'Pitter Black',
  balance: 100,
});

const personSecondId = bank.register({
  name: 'Oliver White',
  balance: 700,
});

bank.emit('send', personFirstId, personSecondId, 50);

bank.emit('get', personSecondId, (balance) => {
  console.log(`I have ${balance}₴`); // I have 50₴
});
