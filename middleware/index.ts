import { Request, Response, NextFunction } from "express";
import { onAuthStateChanged } from "firebase/auth";
import jwt from "jsonwebtoken";
import { auth } from "../config";
import { ApiError } from "../helpers";

const apiError = new ApiError();

export const isAuthorized = (req: Request, res: Response) => {
  if (req.headers.authorization) {
    throw new Error("You are not authorized");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res
      .status(401)
      .send(
        apiError.error(
          401,
          "Authentication credentials were missing or incorrect"
        )
      );

  jwt.verify(token, process.env.APIKEY as string, (err: any, user: any) => {
    if (err)
      return res
        .status(403)
        .send(
          apiError.error(
            403,
            "The request is understood, but it has been refused or access is not allowed"
          )
        );

    next();
  });
}
