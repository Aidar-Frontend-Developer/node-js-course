import { Transform } from "stream";
import { promisify } from "util";
import crypto from "crypto";

import { validateSchema } from "./validator";
import { algorithm, password, privateKey } from "./config";

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
		const encryptedEmail = await this.#encrypt(email);
		const encryptedPassword = await this.#encrypt(password);
		const modifiedData = {
			payload: {
				name,
				email: encryptedEmail,
				password: encryptedPassword,
			},
			meta: {
				source: Guardian.name.toLowerCase(),
				signature: this.#sign(encryptedEmail, encryptedPassword),
			},
		};

		validateSchema(modifiedData, Guardian.name);

		return modifiedData;
	}

	#sign(email, password) {
		const sign = crypto.createSign("SHA256");

		sign.update(email);
		sign.update(password);
		sign.end();

		return sign.sign(privateKey, "hex");
	}

	async #encrypt(value) {
		try {
			const key = await this.#scrypt(password, "salt", 24);
			const buf = Buffer.alloc(16);
			const iv = await this.#randomFill(buf, 10);
			const cipher = crypto.createCipheriv(algorithm, key, iv);

			let encrypted = cipher.update(value, "utf8", "hex");
			encrypted += cipher.final("hex");

			return encrypted;
		} catch (error) {
			throw error;
		}
	}
}

export default Guardian;
