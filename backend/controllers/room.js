import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { errorHandler } from "../util/Error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(errorHandler(500, "Server Error"));
    }

    res.status(200).send(savedRoom);
  } catch (error) {
    return next(errorHandler(500, "Server error "));
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send(updateRoom);
  } catch (error) {
    return next(errorHandler(500, "Not done"));
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelid = req.params.hotelid;
  try {
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(errorHandler(500, "Invalid hotelid"));
    }
    await Room.findByIdAndDelete(req.params.id);
    res.send("Successfully deleted");
  } catch (error) {
    return next(errorHandler(500, "Not done"));
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find();

    res.send(allRooms);
  } catch (error) {
    return next(errorHandler(500, "Not done"));
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const oneRoom = await Room.findById(req.params.id);

    res.send(oneRoom);
  } catch (error) {
    return next(errorHandler(500, "Not done"));
  }
};
