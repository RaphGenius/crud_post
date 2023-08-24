import express from "express";
import prisma from "../prisma/client.js";
const router = express.Router();
import { login, signup } from "../controller/userController.js";
import { emailCheck } from "../middleware/checkUser.js";

const fakeUser = {};

router.post("/login", login);

router.post("/signup", emailCheck, signup);

router.get("/", async (req, res) => {
  try {
    console.log("users");
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "pas de user trouvé" });
  }
});

export const userRoutes = router;
