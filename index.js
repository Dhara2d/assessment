const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const imageRouter = require("./routes/imageRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/images", imageRouter);
const PORT = 5000;

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("DB connected");
    //starting the server once the DB connection is established
    app.listen(PORT, () => {
      console.log(`App is running and listening at port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("DB connection failed");
  });
