const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

// GET current user
router.get("/me", getCurrentUser);

// PATCH to update user
router.patch("/me", updateUser);

module.exports = router;
