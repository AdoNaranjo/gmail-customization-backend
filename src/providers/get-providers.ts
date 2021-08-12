import { Model } from "mongoose";
import { Container } from "typedi";
import { AccountProps } from "root/models";

// Account Models
export const accountModel = (): Model<AccountProps> => {
  return Container.get("model.account");
};
