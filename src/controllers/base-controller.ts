/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  setDataToRequest,
  validateBodyMiddleware,
  validateParamMiddleware,
  validateQueryMiddleware,
  authMiddleWare,
} from "root/middlewares/validation-middleware";

export abstract class Controller {
  public BodyRequest: BodyRequest = null;
  public QueryRequest: QueryRequest = null;
  public ParamsRequest: ParamsRequest = null;
  public RequireAuth = true;

  public getMiddlewares(middlewares: Array<RequestHandler> = []): Array<RequestHandler> {
    if (this.BodyRequest) {
      middlewares.unshift(validateBodyMiddleware(this.BodyRequest));
    }
    if (this.QueryRequest) {
      middlewares.unshift(validateQueryMiddleware(this.QueryRequest));
    }
    if (this.ParamsRequest) {
      middlewares.unshift(validateParamMiddleware(this.ParamsRequest));
    }
    if (this.RequireAuth) {
      middlewares.unshift(authMiddleWare());
    }
    middlewares.unshift(setDataToRequest);

    return middlewares;
  }

  public setUp() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this.handler(res, req.data.body, req.data.query, req.data.params);
      } catch (err) {
        next(err);
      }
    };
  }

  public async handler(
    res?: Response,
    request?: BodyRequest,
    query?: QueryRequest,
    params?: ParamsRequest
  ): Promise<Response | void> {
    return res.json();
  }
}
