import { Router } from "express";
import { publicPosts, privatePosts } from "../db";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.get("/public", (req, res) => {
  return res.json(publicPosts);
});

router.get("/private", checkAuth, (req, res) => {
  return res.json(privatePosts);
});

export { router as postRoute };
