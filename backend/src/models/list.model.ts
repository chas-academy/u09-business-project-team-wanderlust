import mongoose, { Schema, Document } from "mongoose";

// Återanvändbar typ
export type ListType = "favorites" | "travels";

// Interface (för TypeScript)
export interface IList extends Document {
    user: mongoose.Types.ObjectId;
    type: ListType;
    countries: string[];
}

// Schema-definition med enum-validering
const ListSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { 
        type: String,
        enum: ["favorites", "travels"], // 👈 Detta validerar typ i MongoDB
        required: true
    },
    countries: { type: [String], default: [] }
}, { collection: 'Listor' });

export default mongoose.model<IList>('List', ListSchema);
