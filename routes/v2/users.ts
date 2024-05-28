import express, { Request, Response } from "express";
import {
  createUser,
  login,
  updateUser,
  getUser,
} from "../../controller/v2/users";
import { authMiddleware } from "../../middleware";
import { getTokenEmail } from "../../helpers";

const routerV2: any = express.Router();

routerV2.post("/v2/register", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");

  const createdUser = await createUser(req.body);
  res.status(createdUser.code).send(createdUser);
});

routerV2.post("/v2/login", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");

  const loggedIn = await login(req.body);
  res.status(loggedIn.code).send(loggedIn);
});

routerV2.put(
  "/v2/update-user-data",
  authMiddleware,
  async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const updatedData = await updateUser(
      getTokenEmail(token as string),
      req.body
    );
    res.status(updatedData.code).send(updatedData);
  }
);

routerV2.get(
  "/v2/fetch-user-data",
  authMiddleware,
  async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const userData = await getUser(getTokenEmail(token as string));
    res.status(userData.code).send(userData);
  }
);

export default routerV2;
