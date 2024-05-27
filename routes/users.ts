import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.post("/users", (req: Request, res: Response, next: NextFunction) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
});

router.get("/users", (req: Request, res: Response, next: NextFunction) => {
  res.send("/users is existed. ");
});

export default router;
