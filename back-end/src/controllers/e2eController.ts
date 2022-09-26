import { Request, Response } from "express";

import { e2eService } from "../services/e2eService";

async function set (_req: Request, res: Response) {
    await e2eService.deleteData();
    await e2eService.insert(1);
    return res.send("Seeded database").status(202);
}

export const e2eController = {
    set
  };