import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorHandler } from "./Error.js";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "User are not verified"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(errorHandler(403, "Token is invalid"));
    req.user = user;

    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.is_Admin) {
      next();
    } else {
      next(errorHandler(401, "NO permission"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.is_Admin) {
      next();
    } else {
      next(errorHandler(401, "Only admin can do this"));
    }
  });
};
