import { Router, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import connection from "../../db";
import User from "../models/User";

const router = Router();
const knexClient = connection;

router.get("/status", async (req, res) => {
  try {
    // console.log(knexClient.);
    await knexClient.raw("select 1+1 as result");

    res.status(200).send({ status: "Successfully connected to the database" });
  } catch (error) {
    res.status(500).send({ status: "Error connecting to the database", error });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const id = await User.create({
      username,
      email,
      password,
    });

    const user = await User.getById(id);

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (err) {
    res.status(400).json({ message: "Error creating user" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [user] = await knexClient("users").where({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "User logged in", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

export default router;
