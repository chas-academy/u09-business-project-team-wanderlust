import { Request, Response } from "express";
import { addToFavorites, addToTravels, compareCountries } from "../services/user.service";

export const addFave = async (req: Request, res: Response) => {
    try {
        const result = await addToFavorites(req.params.id, req.params.code);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const addTravel = async (req: Request, res: Response) => {
    try{
        const result = await addToTravels(req.params.id, req.params.code);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const compare = async (req: Request, res: Response) => {
    try{
        const result = await addToTravels(req.params.name1, req.params.name2);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};