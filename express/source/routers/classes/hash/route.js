// Instruments
import { ClassesController } from '../../../controllers';

export const getClassByHash = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash });
        const data = await model.getClassByHash();

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const updateClassByHash = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash, payload: req.body });
        const data = await model.updateClassByHash();

        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const removeClassByHash = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash });
        await model.removeClassByHash();

        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
