export const loginUser = (req, res) => {
    try {
        const authorization = req.get('authorization');

        if (authorization) {
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
        const isAuthorized = true;

        if (isAuthorized) {
            res.status(204).end();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};
