import { query, request, response } from "express";
import Hotel from "../models/Hotel.js";
import { errorHandler } from "../util/Error.js";
import Room from "../models/Room.js";

export const getHotels = async (req, res, next) => {
  const itemByCity = req.query.cities;
  const { min, max } = req.query;

  if (itemByCity) {
    try {
      const allHotelDetails = await Hotel.find({
        city: itemByCity,
        cheapestPrice: { $gte: min, $lte: max },
      });
      res.status(200).json(allHotelDetails);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const allHotelDetails = await Hotel.find();
      res.status(200).json(allHotelDetails);
    } catch (err) {
      next(err);
    }
  }
};

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotelDetails = await Hotel.findById(req.params.id);
    res.status(200).json(hotelDetails);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json([list, cities]);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.count({ type: "hotel" });
    const vacationHomeCount = await Hotel.count({ type: "Vacation Home" });
    const guestHouseCount = await Hotel.count({ type: "guest house" });
    const motelCount = await Hotel.count({ type: "motel" });
    const resourtCount = await Hotel.count({ type: "resourt" });

    res.status(200).json([
      {
        type: "hotel",
        count: hotelCount,
      },
      { type: "vacation home", count: vacationHomeCount },

      { type: "guest house", count: guestHouseCount },
      { type: "motel", count: motelCount },
      { type: "resourt", count: resourtCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const featured = async (req, res, next) => {
  const { min, max, limit } = req.query;

  try {
    const featured = await Hotel.find({
      featured: req.query.featured,
      cheapestPrice: { $gt: min, $lt: max },
    }).limit(limit);
    res.status(200).json(featured);
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );

    res.status(200).send(list);
  } catch (error) {
    next(error);
  }
};
