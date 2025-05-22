import mongoose, { Schema, Document } from "mongoose";

export interface IList extends Document {
    user: mongoose.Types.ObjectId;
    type: "favorites" | "travels";
    countries: string[]; // ISO-koder
}

const ListSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["favorites", "travels"], required: true },
    countries: [{ type: String }]
}, { collection: 'Listor' });

export default mongoose.model<IList>('List', ListSchema);