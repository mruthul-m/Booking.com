import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../util/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("You are verified");
});
router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyUser, updateUser);

router.delete("/checkuser/:id", verifyUser, deleteUser);
// router.delete("/checkadmin/:id", verifyAdmin, deleteUser);
router.get("/", verifyAdmin, getUsers);

export default router;
