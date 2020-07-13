import { Transform } from 'stream';
import { promisify } from 'util';
import crypto from 'crypto';

import { validateSchema } from './validator';
import {
	algorithm,
	password,
} from './config';

class Guardian extends Transform {
	constructor(options = {}) {
		super(options);
	}

	#scrypt = promisify(crypto.scrypt);
	#randomFill = promisify(crypto.randomFill);

	_transform(chunk, encoding, done) {
		this.#modify(chunk).then((data) => {
			this.push(data);
			done();
		});
	}

	_flush(done) {
		done();
	}

	async #modify(data) {
		const { name, email, password } = data.payload;
		const modifiedData = {
			payload: {
				name,
				email: await this.#encrypt(email),
				password: await this.#encrypt(password),
			},
			meta: {
				source: Guardian.name.toLowerCase(),
			},
		};

		validateSchema(modifiedData, Guardian.name);

		return modifiedData;
	}

	async #encrypt(value) {
		try {
			const key = await this.#scrypt(password, 'salt', 24);
			const buf = Buffer.alloc(16);
			const iv = await this.#randomFill(buf, 10);
			const cipher = crypto.createCipheriv(algorithm, key, iv);

			let encrypted = cipher.update(value, 'utf8', 'hex');
			encrypted += cipher.final('hex');

			return encrypted;
		} catch (error) {
			throw error;
		}
	}
}

export default Guardian;
