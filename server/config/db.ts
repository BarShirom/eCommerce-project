import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const mongodb_uri = process.env.MONGO_URI;

const connectDB = async () =>{
    mongoose.set("strictQuery", true);
mongoose.connect(mongodb_uri)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("At mongoose.connect:");
    console.error(err.message);
  });
}

export default connectDB;