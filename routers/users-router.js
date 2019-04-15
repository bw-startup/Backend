const router = require("express").Router();
const { register } = require("../helpers/users-helpers.js");

// Register or CREATE- takes in username, email, password, returns object with new user
router.post("/register", async (req, res) => {
  let user = req.body;
  if (!user.email || !user.password) {
    res.status(401).json({
      message: "Email and password are required for registration"
    });
  }
  try {
    await register(user);
    res.status(200).json({
      message: `Successfully created user ${user.email}`
    });
  } catch (error) {
    if (error === 500) {
      res.status(500).json({ message: "Error registering user" });
    }
    else if (error === 406) {
      res.status(406).json({
        message: "Sorry, the email already exists. Please use a different email."
      });
    }
  }
});

//LOGIN- auth required, takes in username and password, returns message, username, and token
//To do: Create token, add bcrypt, and return token along with message.
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    if (email && password) {
      res,
        status(200).json({
          message: `Welcome ${user.email}`,
          username,
          token
        });
    } else {
      res.status(401).json({ message: "Please provide username and password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET list of all users - auth required
router.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting list of users" });
  }
});

module.exports = router;
