export const enroll = (req, res) => {
	try {
		res.status(200).json({ data: [] });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const expel = (req, res) => {
	try {
		res.status(201).json({ data: {} });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
