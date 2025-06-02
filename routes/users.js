const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation"); // ✅ Correct validator for update

// ✅ GET current user
router.get("/me", getCurrentUser);

// ✅ PATCH to update user
router.patch("/me", validateUserUpdate, updateUser);

module.exports = router;
