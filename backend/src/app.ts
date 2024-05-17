import express, { Express } from "express";

import bodyParser from "body-parser";
import cors from "cors";

import rootRouter from "./routes/index";

const app: Express = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: "50mb",
  })
);

app.use("/api/v1", rootRouter);

export default app;
