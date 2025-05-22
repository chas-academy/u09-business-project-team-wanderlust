import User from '../models/user.model';
import { getCountryByName } from './countries.service';

export const getAllUsers = async () => {
    return await User.find({});
};

export const getUserById = async (userId: string) => {
    return await User.findById(userId);
};

export const compareCountries = async (name1: string, name2: string) => {
    const [country1, country2] = await Promise.all([
        getCountryByName(name1),
        getCountryByName(name2)
    ]);

    return {
        countries: [country1.name.common, country2.name.common],
        region: [country1.region, country2.region],
        population: [country1.population, country2.population],
        currencies: [
            Object.keys(country1.currencies || {})[0],
            Object.keys(country2.currencies || {})[0],
        ]
    }
}

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