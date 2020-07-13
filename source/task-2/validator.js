const validateMeta = (meta, streamName) => {
	const { source, signature } = meta;
	const allowedFields = ["source", "signature"];

	if (!source || typeof source !== "string") {
		throw new TypeError(
			`Error in stream - ${streamName}: source does not exist or contains not a valid data type`
		);
	}
	if (signature && typeof signature !== "string") {
		throw new TypeError(
			`Error in stream - ${streamName}: signature does not exist or contains not a valid data type`
		);
	}

	for (const key in meta) {
		if (Object.prototype.hasOwnProperty.call(meta, key)) {
			const isExist = allowedFields.some((field) => field === key);

			if (!isExist) {
				throw new Error(
					`Error in stream - ${streamName}: payload contains not allowed field — ${key}`
				);
			}
		}
	}
};

const validatePayload = (payload, streamName) => {
	const { name, email, password } = payload;
	const allowedFields = ["name", "email", "password"];

	if (!name || typeof name !== "string") {
		throw new TypeError(
			`Error in stream - ${streamName}: name does not exist or contains not a valid data type`
		);
	}
	if (!email || typeof email !== "string") {
		throw new TypeError(
			`Error in stream - ${streamName}: email does not exist or contains not a valid data type`
		);
	}
	if (!password || typeof password !== "string") {
		throw new TypeError(
			`Error in stream - ${streamName}: password does not exist or contains not a valid data type`
		);
	}

	for (const key in payload) {
		if (Object.prototype.hasOwnProperty.call(payload, key)) {
			const isExist = allowedFields.some((field) => field === key);

			if (!isExist) {
				throw new Error(
					`Error in stream - ${streamName}: payload contains not allowed field — ${key}`
				);
			}
		}
	}
};

export const validateSchema = ({ payload, meta }, name) => {
	if (typeof meta !== "object") {
		throw new TypeError(`${name}: meta should be an object`);
	}
	if (typeof payload !== "object") {
		throw new TypeError(`${name}: payload should be an object`);
	}
	validateMeta(meta, name);
	validatePayload(payload, name);
};
