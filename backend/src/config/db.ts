import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log('👉 MONGO_URI:', process.env.MONGO_URI); // debug


const mongoURI = process.env.MONGO_URI as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB är ansluten till Wunderlust');
  } catch (err) {
    console.error('❌ MongoDB-anslutning misslyckades:', err);
    process.exit(1);
  }
};
