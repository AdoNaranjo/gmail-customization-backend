
declare module "mongoose-sequence" {
  import { Mongoose, Schema } from "mongoose";
  const _: (mongoose: Mongoose) => (schema: Schema<any>) => void;
  export = _;
}
