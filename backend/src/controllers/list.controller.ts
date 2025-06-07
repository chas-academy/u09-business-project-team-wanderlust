import { Request, Response } from "express";
import {
  addCountry,
  removeCountry,
  getUserListWithDetails,
  getUserListData,
  moveCountryBetweenLists,
} from "../services/list.service";
import { getCountryByCode } from "../services/countries.service";
import { ListType } from "../models/list.model"; // 👈 importera typen

interface AddToListBody {
  code: string;
}

interface ListParams {
  userId: string;
  type: string;
}


export const addToList = async (req: Request, res: Response): Promise <any> => {
  const { userId, type } = req.params;
  const { code } = req.body;

  if (!code) return res.status(400).json({ error: "Country code krävs" });

  try {
    const country = await getCountryByCode(code);
    if (!country) return res.status(400).json({ error: "Ogiltig landkod" });

    const updated = await addCountry(userId, type as ListType, code);
    res.status(200).json({
      message: `Landet ${code} har lagts till i din ${type}-lista.`,
      list: updated,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const removeFromList = async (req: Request, res: Response): Promise<any> => {
  const { userId, type } = req.params;
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Country code krävs" });
  }

  try {
    const updated = await removeCountry(userId, type as ListType, code); // 👈 här
    res.status(200).json({
      message: `Landet ${code} har tagits bort från din ${type}-lista.`,
      list: updated,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserList = async (req: Request, res: Response): Promise<any> => {
  const { userId, type } = req.params;
  try {
    const countries = await getUserListData(userId, type as ListType); // 👈 här
    res.status(200).json({ countries });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserListController = async (req: Request, res: Response): Promise<any> => {
  const { userId, type } = req.params;
  try {
    const listWithDetails = await getUserListWithDetails(userId, type as ListType); // 👈 här
    if (!listWithDetails) {
      return res.status(404).json({ message: "Listan hittades inte" });
    }
    res.status(200).json(listWithDetails);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const moveCountry = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const { fromType, toType, code } = req.body;

  if (!code || !fromType || !toType) {
    return res.status(400).json({ error: "fromType, toType och code krävs." });
  }

  try {
    const result = await moveCountryBetweenLists(
      userId,
      fromType as ListType,
      toType as ListType,
      code
    );
    res.status(200).json({
      message: `Landet ${code} flyttades från ${fromType} till ${toType}.`,
      list: result,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
