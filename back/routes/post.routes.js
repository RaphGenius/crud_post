import express from "express";
import prisma from "../prisma/client.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getPosts = await prisma.post.findMany();
    res.json(getPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { title, content } = await req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    res.json(newPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Erreur lors de la creation" });
  }
});

router.get("/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const getPost = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(getPost);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification du post" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json({ message: "impossible de supprimer" });
  }
});

export const postRoutes = router;
