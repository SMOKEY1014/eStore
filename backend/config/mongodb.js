import mongoose from "mongoose";

const connectDB = async (url) => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });
  await mongoose.connect(`${process.env.MONGODB_URL}e-commerce`);
  //   try {
  //     await mongoose.connect(`${process.env.MONGODB_URL}/eStore`, {
  //       useUnifiedTopology: true,
  //       useNewUrlParser: true,
  //     });
  // console.log("MongoDB connected successfully");
  //   } catch (error) {
  //     console.log("MongoDB connection failed");
  //   }
};

export default connectDB;
