/* eslint-disable space-before-function-paren */

import { Response } from "express";
import { AccountService } from "root/services";
import { AccountQueryRequest } from "root/requests/api/account";
import { Controller } from "root/controllers/base-controller";

export class CheckAuthorization extends Controller {
  public RequireAuth = false;
  public QueryRequest = AccountQueryRequest;
  public async handler(res: Response, _: BodyRequest, queries: AccountQueryRequest) {
    const isAuth = await AccountService.checkAuthorization(queries);
    return res.json(isAuth);
  }
}
