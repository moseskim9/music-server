const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const artistRoutes = require("./api/routes/artist");
const releaseRoutes = require("./api/routes/release");
const labelRoutes = require("./api/routes/label");

mongoose.connect(
  "mongodb+srv://mosestest123:mosestest123@dotblockchain-uivif.mongodb.net/test?retryWrites=true&w=majority"
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle CORS issues/errors for SPAs
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/artist", artistRoutes);
app.use("/release", releaseRoutes);
app.use("/label", labelRoutes);

// Handle routes that reach this line which means it didn't hit any of the previous routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Handle all other kinds of errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
