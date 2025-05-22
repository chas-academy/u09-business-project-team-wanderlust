import List from "../models/list.model";

export const createList = async (userId: string, type: "favorites" | "travels") => {
    return await List.create({ user: userId, type, countries: [] });
};

export const addCountry = async (userId: string, type: string, code: string) => {
    return await List.findOneAndUpdate(
        { user: userId, type },
        { $addToSet: { countries: code } },
        { new: true, upsert: true }
    );
};

export const removeCountry = async (userId: string, type: string, code: string) => {
    return await List.findOneAndUpdate(
        { user: userId, type },
        { $pull: { countries: code } },
        { new: true }
    );
};

export const getList = async (userId: string, type: string) => {
    return await List.findOne({ user: userId, type });
};
