export const getClasses = (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};

export const createClass = (req, res) => {
    try {
        const data = {};

        res.status(201).json({ data });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};
