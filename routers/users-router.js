const router = require("express").Router();

const verifyAuth = require("../middleware/verify-auth.js");

// TODO: [PUT] /me (edit user details)

// TODO: [GET] /me (get current user object)

// GET list of all users - auth required
router.get("/users", verifyAuth, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting list of users" });
  }
});

module.exports = router;
