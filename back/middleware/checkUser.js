import prisma from "../prisma/client.js";

const emailCheck = async (req, res, next) => {
  const { email } = req.body;
  const emailAlreadyRegistered = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (emailAlreadyRegistered)
    return res.status(500).json({ message: "Adresse mail déjà utilisé" });

  next();
};

export { emailCheck };
