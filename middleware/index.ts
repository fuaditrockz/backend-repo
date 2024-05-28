import { Request, Response, NextFunction } from "express";
import { onAuthStateChanged } from "firebase/auth";
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
