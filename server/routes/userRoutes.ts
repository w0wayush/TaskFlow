import express from "express";
import { signUp, signIn, getUserProfile } from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

// User Routes
router.post("/signup", signUp); // User Signup
router.post("/signin", signIn); // User Signin
router.get("/profile", authenticate, getUserProfile); // Fetch user profile (Protected route)

export default router;
