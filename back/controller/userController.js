import prisma from "../prisma/client.js";

const login = async (req, res) => {
  console.log(req.body);
  res.send({ message: "ca marche ou pas quoi" });
};

const signup = async (req, res) => {
  try {
    const isEmailExist = await prisma.user.findUnique({
      select: {
        id: "1",
      },
    });
    res.status(200).json(isEmailExist);
    console.log(isEmailExist);
  } catch (error) {
    res.status(500).send({ message: "erreur lors de la creation" });
  }
};

export { login, signup };
