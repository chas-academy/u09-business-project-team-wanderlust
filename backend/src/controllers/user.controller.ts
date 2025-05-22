import { Request, Response } from "express";
import { 
    getUserById,
    getAllUsers,
    compareCountries } from "../services/user.service";

export const getUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    console.log(id);
    try {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ error: 'Användare hittades inte' });

        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Något gick fel' });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Något gick fel' });
    }
};

export const compare = async (req: Request, res: Response) => {
    try{
        const result = await compareCountries(req.params.name1, req.params.name2);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};