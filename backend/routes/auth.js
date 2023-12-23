import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyUser } from "../util/verifyToken.js";

const router = express.Router();

// to register
router.post("/register", register);

// to login
router.post("/login", login);

export default router;
