export const post = (req, res) => {
	try {
		res.sendStatus(204);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
