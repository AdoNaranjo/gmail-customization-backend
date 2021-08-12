import { AccountQueryRequest } from "root/requests/api/account";
import { accountModel } from "root/providers";

export const checkAuthorization = async (queries: AccountQueryRequest): Promise<boolean> => {
  const account = await accountModel().findOne({ email: queries.email });
  if (account) {
    return true;
  } else {
    return false;
  }
};
