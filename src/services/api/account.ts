import { AccountQueryRequest } from "root/requests/api/account";
import { accountModel } from "root/providers";

type CheckAuthorizationType = {
  isAuth: boolean;
  isNewUser: boolean;
};

export const checkAuthorization = async (queries: AccountQueryRequest): Promise<CheckAuthorizationType> => {
  let account = await accountModel().findOne({ email: queries.email });
  if (account) {
    const isAuth = !!account.refreshToken;
    if (!isAuth) {
      await accountModel().updateOne({ email: account.email }, { isNewUser: false });
    }
    return { isAuth, isNewUser: false };
  } else {
    account = await accountModel().create({ email: queries.email, refreshToken: "", code: "", isNewUser: true });
    await account.save();
    return { isAuth: false, isNewUser: true };
  }
};
