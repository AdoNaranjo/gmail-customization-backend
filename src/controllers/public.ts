import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";

export const getHome = (_: Request, res: Response) => {
  res.json({
    msg: "Welcome",
    version: process.env.npm_package_version,
  });
};

export const getHealth = (_: Request, res: Response) => {
  // Put logic to check DB connection, cache Connection and Etc here
  // If something wrong on that give status NOT OK
  // If status NOT OK set status code as HttpStatus.SERVICE_UNAVAILABLE
  const somethingWrong = mongoose.connection.readyState != 1;

  if (somethingWrong) {
    res.status(HttpStatus.SERVICE_UNAVAILABLE);
    return res.json({
      status: "Unavailable",
      dbStatus: mongoose.STATES[mongoose.connection.readyState],
    });
  }
  res.status(HttpStatus.OK);
  res.json({
    status: "OK",
    dbStatus: mongoose.STATES[mongoose.connection.readyState],
  });
};

export const getPing = (_: Request, res: Response) => {
  res.status(HttpStatus.OK).send("PONG");
};
