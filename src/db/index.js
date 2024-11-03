// IMPORTANT -
// 1) Database is always is in other continent
// 2) Use async/await for connnecting to database
// 3) Do not use any special character in MongoDB password you will get an error while connecting

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const resp = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`\n MongoDB connected !! DB HOST: 
            ${resp.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection Failed! :", error);
    process.exit(1);
  }
};

export default connectDB;
