import User from "../models/User.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../util/Error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Registration
export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    password: hash,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(errorHandler(400, "Invalid username"));

    const is_passwd = await bcrypt.compare(req.body.password, user.password);

    if (!is_passwd) return next(errorHandler(400, "Incorrect Password"));

    const token = jwt.sign(
      { id: user.id, is_Admin: user.isAdmin },
      process.env.JWT
    );

    res.cookie("access_token", token, { httpOnly: true });

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (error) {
    next(error);
  }
};
