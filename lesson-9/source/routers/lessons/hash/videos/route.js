export const addVideoToLesson = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};
