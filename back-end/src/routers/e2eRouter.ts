import { Router } from "express";

import { e2eController } from "../controllers/e2eController";

const e2eRouter = Router();

e2eRouter.get("/set", e2eController.set);

export default e2eRouter;