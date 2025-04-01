const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { NOT_FOUND } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMP AUTH MIDDLEWARE (will be replaced later)
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // Replace with your actual test user _id
  };
  next();
});

// Routes
app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/clothingItems"));

// Default 404 route
app.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
