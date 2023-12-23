import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import hotelsRouter from "./routes/hotels.js";
import userRouter from "./routes/users.js";
import roomRouter from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config(); //Used to config the envitronment variables

const PORT = 5444;

const connect = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to the database");
  } catch (error) {
    throw error;
  }
};

// Used to show the connection of mongod
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB is Disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB is Connected");
});

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(401).send({
    stack: err.stack,
    message: err.message,
    status: err.status,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port number ${PORT}`);
  connect();
});
