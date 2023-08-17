import express from "express";
// controllers
import { commentPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ---------------------------------- READ ---------------------------------- */
// homepage
router.get("/", verifyToken, getFeedPosts);
// posts of a profile
router.get("/:userId/posts", verifyToken, getUserPosts);

/* --------------------------------- UPDATE --------------------------------- */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost)

export default router;
