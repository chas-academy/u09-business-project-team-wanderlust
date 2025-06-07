/* import List from "../models/list.model";
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
    const result = await List.findOneAndUpdate(
    { user: userId, type },
    { $pull: { countries: code } },
    { new: true }
);

if (!result) {
    throw new Error("List not found or country not in list");
}

return result;

}
export const getUserListData = async (userId: string, type: string) => {
    const list = await List.findOne({ user: userId, type });

    if (!list) {
        throw new Error('Listan hittades inte');
    }

    return list.countries; // Här måste du returnera rätt fält
};

export const getUserListWithDetails = async (userId: string, type: string) => {
    let list = await List.findOne({ user: userId, type });

    if (!list) {
        list = await List.create({
            user: userId,
            type,
            countries: [],
        });
    }

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

export const moveCountryBetweenLists = async (
  userId: string,
  fromType: "favorites" | "travels",
  toType: "favorites" | "travels",
  code: string
) => {
  // 1. Ta bort från den gamla listan
  await List.findOneAndUpdate(
    { user: userId, type: fromType },
    { $pull: { countries: code } }
  );

  // 2. Lägg till i den nya listan
  const updated = await List.findOneAndUpdate(
    { user: userId, type: toType },
    { $addToSet: { countries: code } },
    { new: true, upsert: true }
  );

  return updated;
}; */

import List, { ListType } from "../models/list.model"; // 👈 importera typen
import { getCountryByCode } from './countries.service';
import { Request, Response } from "express";

export const createList = async (userId: string, type: ListType) => {
    return await List.create({ user: userId, type, countries: [] });
};

export const addCountry = async (userId: string, type: ListType, code: string) => {
    return await List.findOneAndUpdate(
        { user: userId, type },
        { $addToSet: { countries: code } },
        { new: true, upsert: true }
    );
};

export const removeCountry = async (userId: string, type: ListType, code: string) => {
    const result = await List.findOneAndUpdate(
        { user: userId, type },
        { $pull: { countries: code } },
        { new: true }
    );

    if (!result) {
        throw new Error("List not found or country not in list");
    }

    return result;
};

export const getUserListData = async (userId: string, type: ListType) => {
    const list = await List.findOne({ user: userId, type });

    if (!list) {
        throw new Error('Listan hittades inte');
    }

    return list.countries;
};

export const getUserListWithDetails = async (userId: string, type: ListType) => {
    let list = await List.findOne({ user: userId, type });

    if (!list) {
        list = await List.create({
            user: userId,
            type,
            countries: [],
        });
    }

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

export const moveCountryBetweenLists = async (
    userId: string,
    fromType: ListType,
    toType: ListType,
    code: string
) => {
    await List.findOneAndUpdate(
        { user: userId, type: fromType },
        { $pull: { countries: code } }
    );

    const updated = await List.findOneAndUpdate(
        { user: userId, type: toType },
        { $addToSet: { countries: code } },
        { new: true, upsert: true }
    );

    return updated;
};

