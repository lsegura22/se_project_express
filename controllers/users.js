const User = require("../models/user");

// Get all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
    });
};

// Get user by ID
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid user ID" });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
      }
    });
};

// Create a new user
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res
          .status(400)
          .send({ message: "Invalid data provided for creating user" });
      } else {
        res.status(500).send({ message: "Internal server error" });
      }
    });
};
