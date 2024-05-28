require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";

import router from "./routes/v1/users";
import routerV2 from "./routes/v2/users";

const app: any = express();
const port: number = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(router);
app.use(routerV2);
