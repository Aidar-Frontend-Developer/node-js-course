// Instruments
import { UsersController } from '../../../controllers';

export const getUserByHash = async (req, res) => {
    try {
        const { userHash } = req.params;
        const model = new UsersController({ hash: userHash });
        const data = await model.getUserByHash();
        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const updateUserByHash =  async (req, res) => {
    try {
        const { userHash } = req.params;
        const model = new UsersController({ hash: userHash, payload: req.body });
        const data = await model.updateUserByHash();
        res.status(200).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const removeUserByHash = async (req, res) => {
    try {
        const { userHash } = req.params;
        const model = new UsersController({ hash: userHash });
        await model.removeUserByHash();
        res.sendStatus(204);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
