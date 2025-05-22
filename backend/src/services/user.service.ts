import User from '../models/user.model';

export const getAllUsers = async () => {
    return await User.find({});
};

export const getUserById = async (userId: string) => {
    return await User.findById(userId);
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