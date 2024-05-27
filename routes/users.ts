import express, { Request, Response, NextFunction } from "express";
import { createUser } from "../controller/users";
import { auth } from "../config";
import { User } from "../types";

const router = express.Router();

router.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");

    const user: User = {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      photoURL: req.body.photoURL,
    };

    const result: any = await createUser(auth, user);

    if (result.error) {
      console.log("error");
      res.status(result.code).send(result);
    } else {
      console.log("success", typeof result);
      res.status(result.code).send(result);
    }
  }
);

router.get("/users", (req: Request, res: Response, next: NextFunction) => {
  res.send("/users is existed. " + auth.currentUser);
});

export default router;
