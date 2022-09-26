import cors from "cors";
import express from "express";
import "express-async-errors";
import "dotenv/config";

import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import recommendationRouter from "./routers/recommendationRouter";
import e2eRouter from "./routers/e2eRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recommendations", recommendationRouter);
//if(process.env.MODE === 'TEST') {
    app.use("/test", e2eRouter);
//}

app.use(errorHandlerMiddleware);

export default app;
