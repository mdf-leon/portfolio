import { Router, Request, Response } from "express";
import Email from "../entities/Email";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const email = await Email.create({ email: req.body.email });
    res.status(201).json({ message: "Email stored successfully", email });
  } catch (error) {
    res.status(500).json({ message: "Error storing email", error });
  }
});

export default router;
