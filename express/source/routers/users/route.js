// Instruments
import { UsersController } from '../../controllers';

export const getUsers = async (req, res) => {
    try {
        const { page = 1, size = 10 } = req.query;
        const model = new UsersController({ page, size });
        const data = await model.getUsers();
        res.status(200).json({ ...data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};

export const addUser = async (req, res) => {
    try {
        const model = new UsersController(req.body);
        const data = await model.create();
        res.status(201).json({ data });
    } catch ({ message }) {
        res.status(400).json({ message });
    }
};
