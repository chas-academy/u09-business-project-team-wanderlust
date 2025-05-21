import { Request, Response } from "express";
import { 
    addToFavorites,
    removeFromFavorites, 
    addToTravels,
    removeFromTravels,
    compareCountries } from "../services/user.service";

export const addFave = async (req: Request, res: Response) => {
    try {
        const result = await addToFavorites(req.params.id, req.params.code);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const removeFave = async (req: Request, res: Response) => {
    const { id, code } = req.params;
    const user = await removeFromFavorites(id, code);
    res.status(200).json(user);
};

export const addTravel = async (req: Request, res: Response) => {
    try{
        const result = await addToTravels(req.params.id, req.params.code);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const removeTravel = async (req: Request, res: Response) => {
    const { id, code } = req.params;
    const user = await removeFromTravels(id, code);
    res.status(200).json(user);
};

export const compare = async (req: Request, res: Response) => {
    try{
        const result = await compareCountries(req.params.name1, req.params.name2);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};