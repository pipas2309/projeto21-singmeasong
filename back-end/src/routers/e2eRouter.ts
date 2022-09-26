import { Router } from "express";

import { e2eController } from "../controllers/e2eController";

const e2eRouter = Router();

e2eRouter.get("/createData", e2eController.createData);
e2eRouter.get("/clearData", e2eController.clearData);

export default e2eRouter;