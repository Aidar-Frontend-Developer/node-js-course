export const addKeynoteToLesson = (req, res) => {
    try {
        res.status(204).end();
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};
