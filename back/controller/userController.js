import prisma from "../prisma/client.js";

const login = async (req, res) => {
  console.log(req.body);
  res.send({ message: "ca marche ou pas quoi" });
};

const signup = async (req, res) => {
  console;
  try {
    const { email, password, username } = await req.body;
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).send({ message: "erreur lors de la creation" });
  }
};

export { login, signup };
