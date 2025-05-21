import User from '../models/user.model';
import { getCountryByName } from './countries.service';

export const getUserById = async (userId: string) => {
    return await User.findById(userId);
};

export const addToFavorites = async (userId: string, code: string) => {
    return await User.findByIdAndUpdate(userId, {
        $addToSet: { favoriteCountries: code }
    }, { new: true });
};

export const addToTravels = async (userId: string, code: string) => {
    return await User.findByIdAndUpdate(userId, {
        $addToSet: { travelPlans: code }
}, { new: true });
};

export const compareCountries = async (name1: string, name2: string) => {
    const [c1, c2] = await Promise.all([
        getCountryByName(name1),
        getCountryByName(name2)
    ]);

    const country1 = c1[0];
    const country2 = c2[0];

    return {
        countries: [country1.name.common, country2.name.common],
        region: [country1.region, country2.region],
        population: [country1.name.population, country2.name.population],
        currency: [
            Object.keys(country1.currency || {})[0],
            Object.keys(country2.currency || {})[0],
        ]
    }
};

export const removeFromFavorites = async (userId: string, code: string) => {
    return await User.findByIdAndUpdate(userId, {
        $pull: { favoriteCountries: code }
    }, { new: true });
};

export const removeFromTravels = async (userId: string, code: string) => {
    return await User.findByIdAndUpdate(userId, {
        $pull: { travelPlans: code }
    }, { new: true });
};