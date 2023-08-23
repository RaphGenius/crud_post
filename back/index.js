import express from "express";
import cors from "cors";
import prisma from "./prisma/client.js";
import { postRoutes } from "./routes/post.routes.js";
import { userRoutes } from "./routes/user.routes.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/post", postRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Running on port : ${PORT} `);
});
