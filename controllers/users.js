const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// Get all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error" });
    });
};

// Get user by ID
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Internal server error" });
      }
    });
};

// Create a new user
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided for creating user" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Internal server error" });
      }
    });
};
