export const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            res.status(204).end();
        } else {
            res.status(400).json({ message: 'incorrect payload' });
        }
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.status(204).end();
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};
