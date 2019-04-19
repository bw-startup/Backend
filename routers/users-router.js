const router = require("express").Router();
const bcrypt = require("bcrypt");

const {
  find,
  findById,
  updateUser,
  deleteUser
} = require("../helpers/users-helpers.js");
const verifyAuth = require("../middleware/verify-auth.js");

router.delete("/me", verifyAuth, async (req, res) => {
  const { user_id } = req.tokenPayload;

  try {
    const deletedUser = await deleteUser(user_id);

    if (deletedUser) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "Your account does not longer exists"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting your account. "
    });
  }
});

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

      await updateUser(user_id, user);
      const updatedUser = await findById(user_id);

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({
        message: "Error updating user information"
      });
    }
  }
});

router.get("/me", verifyAuth, async (req, res) => {
  const { user_id, email } = req.tokenPayload;

  try {
    const user = await findById(user_id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error getting user information"
    });
  }
});

router.get("/users", verifyAuth, async (req, res) => {
  try {
    const users = await find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error getting list of users" 
    });
  }
});

module.exports = router;
