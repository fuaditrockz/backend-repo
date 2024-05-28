import { Request, Response, NextFunction } from "express";
import { onAuthStateChanged } from "firebase/auth";
import jwt from "jsonwebtoken";
import { auth } from "../config";

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

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.APIKEY as string, (err: any, user: any) => {
    console.log(err);
    console.log(user);

    if (err) return res.sendStatus(403);

    next();
  });
}
