import express, { Request, Response, NextFunction } from "express";
import { createUser, login } from "../../controller/v1/users";
import { auth } from "../../config";
import { User } from "../../types";

const router = express.Router();

router.post("/v1/register", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");

  const user: User = {
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.displayName,
    photoURL: req.body.photoURL,
  };

  const result: any = await createUser(auth, user);
  res.status(result.code).send(result);
});

router.post("/v1/login", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");

  const user: User = {
    email: req.body.email,
    password: req.body.password,
  };

  const result: any = await login(auth, user);
  res.status(result.code).send(result);
});

export default router;
