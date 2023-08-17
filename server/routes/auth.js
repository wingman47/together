import express from "express";
import { login } from "../controllers/auth.js";

// create modular and reusable sets of routes
const router = express.Router();

// in index.js, app.use("/auth", authRoutes) is treated as /auth/login 
router.post("/login", login); 

export default router;