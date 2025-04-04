const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { NOT_FOUND } = require("./utils/errors");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const userRoutes = require("./routes/users");
const { getClothingItems } = require("./controllers/clothingItems"); // only GET is public
const protectedItemRoutes = require("./routes/clothingItems");

const app = express();
const { PORT = 3001 } = process.env;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Public routes (no auth required)
app.post("/signup", createUser);
app.post("/signin", login);
app.get("/items", getClothingItems); // Only GET is public

// Auth middleware — protects everything below this line
app.use(auth);

// Protected routes
app.use("/users", userRoutes);
app.use("/items", protectedItemRoutes); // All other /items methods (POST, DELETE, etc.)

// Catch-all 404 route
app.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
