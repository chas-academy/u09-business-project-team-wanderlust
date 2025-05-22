import { Request, Response } from "express";
import { addCountry, removeCountry, getList } from "../services/list.service";

export const addToList = async (req: Request, res: Response) => {
    const { userId, type, code } = req.params;
    try {
        const updated = await addCountry(userId, type, code);
        res.status(200).json(updated);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const removeFromList = async (req: Request, res: Response) => {
    const { userId, type, code } = req.params;
    try {
        const updated = await removeCountry(userId, type, code);
        res.status(200).json(updated);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserList = async (req: Request, res: Response): Promise<any> => {
    const { userId, type } = req.params;
    try {
        const list = await getList(userId, type);
        if (!list) return res.status(404).json({ message: "List not found" });
        res.status(200).json(list);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
