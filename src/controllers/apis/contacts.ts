/* eslint-disable space-before-function-paren */

import { Response } from "express";
import { ContactService } from "root/services";
import { ContactsQueryRequest } from "root/requests/api/contacts";
import { Controller } from "root/controllers/base-controller";

export class GetContact extends Controller {
  public RequireAuth = false;
  public QueryRequest = ContactsQueryRequest;
  public async handler(res: Response, _: BodyRequest, queries: ContactsQueryRequest) {
    const result = await ContactService.getContact(queries);
    return res.json(result);
  }
}
