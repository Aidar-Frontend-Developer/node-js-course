export const authorization = (password) => (req, res, next) => {
    const authorization = req.get('authorization');

    if (authorization === password) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
