import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    favoriteCountries: string[];
    travelPlans: string[];
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    favoriteCountries: [{ type: String }],
    travelPlans: [{ type: String }],
}, { collection: 'Användare' });

export default mongoose.model<IUser>('User', UserSchema);