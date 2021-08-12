import mongoose, { Mongoose } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

export default async (mongoose: Mongoose, connectionUri: string) => {
  await mongoose
    .connect(connectionUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running and mongodb env configuration valid. " + err
      );
    });
};

export const AutoIncrement = AutoIncrementFactory(mongoose);
