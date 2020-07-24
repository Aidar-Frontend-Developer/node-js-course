export const getClasses = (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const addClass = (req, res) => {
    try {
        const data = {};

        res.status(201).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
