const router = require("express").Router();

const { register, login } = require("../helpers/auth-helpers.js");
const verifyAuth = require("../middleware/verify-auth.js");

// Register - takes in email & password, responds with success message
router.post("/register", async (req, res) => {
  let user = req.body;
  const hasRequiredFields = !!(user.password && user.email);

  if (!hasRequiredFields) {
    res.status(401).json({
      message: "Email and password are required for registration"
    });
  }
  else {
    try {
      await register(user);
      res.status(201).json({
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
  }
});

// LOGIN - takes in username & password, responds with message & token
// TODO: Add set-cookie response header with token
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (email && password) {
    try {
      const token = await login({ email, password });
      res.status(200).json({
          message: `Welcome ${email}`,
          token
      });
    } catch (error) {
      if (error === 500) {
        res.status(500).json({
          message: "Server failed to retrieve users"
        });
      }
      else if (error === 406) {
        res.status(406).json({
          message: "Invalid credentials. Please try again."
        });
      }
    }
  } else {
    res.status(401).json({ message: "Please provide username and password" });
  }
});

router.get("/verify", verifyAuth, (req, res) => {
  res.status(200).json({
    currentUserIsVerified: true
  });
});

module.exports = router;
