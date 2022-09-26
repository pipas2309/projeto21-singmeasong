import { Request, Response } from "express";

import { e2eService } from "../services/e2eService";

async function createData (_req: Request, res: Response) {
    await e2eService.insert();
    return res.send("Seeded database").status(201);
}

async function clearData (_req: Request, res: Response) {
    await e2eService.deleteData();
    return res.send("Clean database").status(204);
}

export const e2eController = {
    createData,
    clearData
  };
  