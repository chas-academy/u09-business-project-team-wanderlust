import mongoose, { Schema, Document } from "mongoose";

export interface IList extends Document {
    user: mongoose.Types.ObjectId;
    type: { 
        type: String,
        enum: ["fvorites", "travels"],
        required: true,
    }
    countries: string[];
}

const ListSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    countries: { type: [String], default: [] }
}, { collection: 'Listor' });

export default mongoose.model<IList>('List', ListSchema);