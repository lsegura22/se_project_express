const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// Get all clothing items
module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error" });
    });
};

// Create a clothing item
module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error" });
    });
};

// Delete a clothing item
module.exports.deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail(() => new Error("Item not found"))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else if (err.message === "Item not found") {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        console.error(err);
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Internal server error" });
      }
    });
};

// Like a clothing item
module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Internal server error" });
      }
    });
};

// Unlike a clothing item
module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Internal server error" });
      }
    });
};
