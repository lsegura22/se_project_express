// routes/clothingItems.js

const express = require("express");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const router = express.Router();

// GET all items
router.get("/", getClothingItems);

// POST a new item
router.post("/", createClothingItem);

// DELETE an item by ID
router.delete("/:itemId", deleteClothingItem);

// PUT a like on an item
router.put("/:itemId/likes", likeItem);

// DELETE a like from an item
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
