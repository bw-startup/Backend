const router = require("express").Router();

// TODO: [PUT] /users/:id (edit user details)

// TODO: [GET] /me (get current user object)

// GET list of all users - auth required
router.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting list of users" });
  }
});

module.exports = router;
