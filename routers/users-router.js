const router = require("express").Router();
const { find, findById } = require("../helpers/auth-helpers.js");
const verifyAuth = require("../middleware/verify-auth.js");

// TODO: [PUT] /me (edit user details)

// TODO: [GET] /me (get current user object)
router.get("/me", verifyAuth, async (req, res) => {
  const { user_id, email } = req.tokenPayload;
  try {
    const user = await findById(user_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error getting user information" });
  }
});

// GET list of all users - auth required
router.get("/users", verifyAuth, async (req, res) => {
  console.log(req.tokenPayload);
  try {
    const users = await find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting list of users" });
  }
});

module.exports = router;
