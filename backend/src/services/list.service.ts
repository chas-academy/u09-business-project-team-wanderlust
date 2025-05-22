import List from "../models/list.model";
import { getCountryByCode } from './countries.service';

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

export const getUserListData = async (userId: string, type: string) => {
    const list = await List.findOne({ user: userId, type });

    if (!list) {
        throw new Error('Listan hittades inte');
    }

    return list.countries; // Här måste du returnera rätt fält
};

export const getUserListWithDetails = async (userId: string, type: string) => {
    const list = await List.findOne({ user: userId, type: type });
    if (!list) return null;

    const detailedItems = await Promise.all(
        list.countries.map(async (code: string) => {
        const country = await getCountryByCode(code);
        return {
            code,
            name: country.name.common,
            flag: country.flags.png,
            region: country.region,
            population: country.population,
        };
        })
    );

    return {
        userId: list.user,
        type: list.type,
        countries: detailedItems,
    };
};
