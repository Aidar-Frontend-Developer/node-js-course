// eslint-disable-next-line require-await
export const loginUser = async (req, res) => {
    try {
        req.session.user = { email: 'test@gmail.com' };

        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
