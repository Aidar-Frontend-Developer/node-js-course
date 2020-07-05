import { Writable } from 'stream';
import { promisify } from 'util';
import crypto from 'crypto';

import { validateSchema } from './validator';
import {
	algorithm,
	password,
} from './config';

class AccountManager extends Writable {
	constructor(options = {}) {
		super(options);
		this.data = [];
	}

	#scrypt = promisify(crypto.scrypt);
	#randomFill = promisify(crypto.randomFill);

	_write(chunk, encoding, done) {
		const { payload } = chunk;

		this.data.push(this.#modify(payload));
		done();
	}

	#modify(data) {
		const modifiedData = {
			payload: {
				...data,
			},
			meta: {
				source: AccountManager.name.toLowerCase(),
			},
		};

		validateSchema(modifiedData, AccountManager.name);

		return modifiedData;
	}

	async #decrypt(value) {
		try {
			const key = await this.#scrypt(password, 'salt', 24);
			const buf = Buffer.alloc(16);
			const iv = await this.#randomFill(buf, 10);
			const decipher = crypto.createDecipheriv(algorithm, key, iv);

			let decrypted = decipher.update(value, 'hex', 'utf8');
			decrypted += decipher.final('utf8');

			return decrypted;
		} catch (error) {
			throw error;
		}
	}
}

export default AccountManager;
