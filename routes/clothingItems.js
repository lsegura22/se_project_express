const express = require("express");
const auth = require("../middlewares/auth");
const {
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// ✅ Import validation functions
const { validateCardBody, validateId } = require("../middlewares/validation");

const router = express.Router();

// ✅ Apply auth and validation to each route
router.post("/", auth, validateCardBody, createClothingItem); // validation for item body
router.delete("/:itemId", auth, validateId, deleteClothingItem); // validation for itemId
router.put("/:itemId/likes", auth, validateId, likeItem); // validation for itemId
router.delete("/:itemId/likes", auth, validateId, dislikeItem); // validation for itemId

module.exports = router;
