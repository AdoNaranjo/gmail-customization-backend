import { Schema, model, Document } from "mongoose";

export interface AccountProps extends Document {
  email: string;
  refreshToken: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AccountSchema: Schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    email: { type: String },
    refreshToken: { type: String },
    code: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
    _id: true,
  }
);

AccountSchema.virtual("id").get(function () {
  return this._id;
});

AccountSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_: any, ret: { _id: any }) {
    delete ret._id;
  },
});

export const Account = model<AccountProps>("Account", AccountSchema);
