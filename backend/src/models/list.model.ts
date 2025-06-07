import mongoose, { Schema, Document } from "mongoose";
/*
export interface IList extends Document {
    user: mongoose.Types.ObjectId;
    type: { 
        type: String,
        enum: ["favorites", "travels"],
        required: true,
    }
    countries: string[];
}

const ListSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { 
        type: String, 
        enum: ["favorites", "travels"], 
        required: true 
    },
    countries: { type: [String], default: [] }
}, { collection: 'Listor' });*/

// Punkt 3: Återanvändbar typ
export type ListType = "favorites" | "travels";

// Punkt 2: Interface (för TypeScript)
export interface IList extends Document {
    user: mongoose.Types.ObjectId;
    type: ListType;
    countries: string[];
}

// Punkt 2: Schema-definition med enum-validering
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
