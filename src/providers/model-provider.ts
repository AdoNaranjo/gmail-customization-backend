import { Container } from "typedi";
import { Account } from "root/models";

export const modelProvider = (): void => {
  Container.set("model.account", Account);
};
