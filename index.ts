import express, { Request, Response } from "express";
import { getUsers } from "./controller/users";
import { db } from "./config";

const app: any = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  try {
    const testData = async () => {
      const data = await getUsers(db);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
