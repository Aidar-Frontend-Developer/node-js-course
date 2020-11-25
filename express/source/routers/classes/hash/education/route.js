// Instruments
import { ClassesController } from '../../../../controllers';

export const enrollToClass = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash, payload: req.body });
        await model.enrollToClass();

        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const expelFromClass = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash, payload: req.body });
        await model.expelFromClass();

        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
