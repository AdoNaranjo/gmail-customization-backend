/* eslint-disable space-before-function-paren */

import { Response } from "express";
import { GoogleService } from "root/services";
import { Controller } from "root/controllers/base-controller";
import { AuthQueryResultRequest } from "root/requests/auth";

export class GetGoogleAuthURL extends Controller {
  public RequireAuth = false;
  public async handler(res: Response) {
    const authURL = GoogleService.getGoogleAuthURL();
    return res.redirect(authURL);
  }
}

export class SaveAuthCode extends Controller {
  public RequireAuth = false;
  public QueryRequest = AuthQueryResultRequest;
  public async handler(res: Response, _: BodyRequest, queries: AuthQueryResultRequest) {
    const result = await GoogleService.saveAuthCode(queries);
    if (result) return res.redirect("https://mail.google.com");
    return res.json(result);
  }
}
