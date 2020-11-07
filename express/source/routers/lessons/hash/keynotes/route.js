export const addKeynoteToLesson = (req, res) => {
    try {
        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
