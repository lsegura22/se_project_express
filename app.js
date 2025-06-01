require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const { NOT_FOUND } = require("./utils/errors");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const userRoutes = require("./routes/users");
const { getClothingItems } = require("./controllers/clothingItems");
const protectedItemRoutes = require("./routes/clothingItems");

const app = express();
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Enable CORS and parse JSON
app.use(cors());
app.use(bodyParser.json());

// ✅ Log all incoming requests
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// ✅ Public routes (no auth required)
app.post("/signup", createUser);
app.post("/signin", login);
app.get("/items", getClothingItems); // Only GET is public

// ✅ Auth middleware for all routes below
app.use(auth);

// ✅ Protected routes
app.use("/users", userRoutes);
app.use("/items", protectedItemRoutes); // All other /items methods

// ✅ 404 for all unmatched routes
app.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// ✅ Log all errors that occurred after routes
app.use(errorLogger);

// ✅ Celebrate validation errors
app.use(errors());

// ✅ Centralized custom error handler
app.use(errorHandler);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
