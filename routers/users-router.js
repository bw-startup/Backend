const router = require("express").Router();
const bcrypt = require("bcrypt");

const {
  find,
  findById,
  updateUser,
  deleteUser
} = require("../helpers/users-helpers.js");
const verifyAuth = require("../middleware/verify-auth.js");

//TODO: [DELETE] /me (delete user details)
router.delete("/me", verifyAuth, async (req, res) => {
  const { user_id } = req.tokenPayload;
  console.log(user_id);
  try {
    const deletedUser = await deleteUser(user_id);
    console.log(deletedUser);
    if (deletedUser) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Your account does not longer exists" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting your account. " });
  }
});

// TODO: [PUT] /me (edit user details)
// MUST ADD HASHING TO PASSWORD HERE
router.put("/me", verifyAuth, async (req, res) => {
  const { user_id, email } = req.tokenPayload;
  const user = req.body;

  if (!user.id) {
    res.status(400).json({
      message: "Must provide both email and password to update user"
    });
  } else {
    try {
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;

      const numItems = await updateUser(user_id, user);
      const updatedUser = await findById(user_id);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user information" });
    }
  }
});

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
