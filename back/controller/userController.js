import prisma from "../prisma/client.js";
import jwt from "jsonwebtoken";
const login = async (req, res) => {
  console.log(req.body);
  res.send({ message: "ca marche ou pas quoi" });
};

const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });
    const token = jwt.sign(
      {
        id: newUser.id,
        username,
        newUser,
      },
      "jizeohriezhiurez",
      { expiresIn: "4 hours" }
    );
    console.log(token);
    res.status(200).json({ newUser, access_token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export { login, signup };
