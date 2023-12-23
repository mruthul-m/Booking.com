import express from "express";
import { verifyAdmin } from "../util/verifyToken.js";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
  getRoom,
} from "../controllers/room.js";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
router.get("/", getRooms);
router.get("/:id", getRoom);
router.post("/:roomID/:numberID");

export default router;
