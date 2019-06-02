import * as express from "express";
import { Request, Response } from "express";
import * as core from "express-serve-static-core";
import * as cors from "cors";

// Actual quiz mock data
import { quiz } from "./quiz/quiz";

const PORT = 8080;
const app: core.Express = express();

app.get("/api/quiz", cors(), (req: Request, res: Response) => {
  res.send(quiz);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
