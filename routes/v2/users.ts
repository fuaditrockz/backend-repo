import express, { Request, Response } from "express";
import { getUsers, createUser, login } from "../../controller/v2/users";
import { authenticateToken } from "../../middleware";

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

export default routerV2;
