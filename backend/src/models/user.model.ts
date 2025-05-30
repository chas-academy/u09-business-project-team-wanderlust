import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    googleId: string;
    username: string;
    email: string;
}

const UserSchema: Schema = new Schema({
    googleId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, { collection: 'Användare' });

export default mongoose.model<IUser>('User', UserSchema);