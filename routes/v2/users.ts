import express, { Request, Response } from "express";
import {
  getUsers,
  createUser,
  login,
  updateUserData,
} from "../../controller/v2/users";
import { authenticateToken } from "../../middleware";
import { getTokenEmail } from "../../helpers";

const routerV2: any = express.Router();

routerV2.get("/v2/user", (req: Request, res: Response) => {
  try {
    const testData = async () => {
      const data = await getUsers();
      console.log(data);
      return data;
    };

    console.log(JSON.stringify(testData()));
    console.log("From / route");

    res.send("Hello World!");
  } catch (error: any) {
    res.send(error.message);
  }
});

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
  authenticateToken,
  async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const updatedData = await updateUserData(
      getTokenEmail(token as string),
      req.body
    );
    res.status(updatedData.code).send(updatedData);
  }
);

export default routerV2;
