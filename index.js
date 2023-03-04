const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const {
  userRoutes,
  conversationRoutes,
  gigRoutes,
  messageRoutes,
  orderRoutes,
  reviewRoutes,
  authRoutes,
} = require("./routes");

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

app.listen(4000, async () => {
  await databaseConnection();
  console.log("server is listening on port 4000");
});
