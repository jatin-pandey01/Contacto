import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connectDB = async()=>{
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/contacto`);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error : ", error);
    process.exit(1);
  }
}

export default connectDB;