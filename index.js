const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

app.listen(4000, async () => {
  await databaseConnection();
  console.log("server is listening on port 4000");
});
