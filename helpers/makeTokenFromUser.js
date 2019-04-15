const jwt = require("jsonwebtoken");

function makeTokenFromUser(user) {
  const payload = {
    user_id: user.id,
    email: user.email
  }

  const options = {
    expiresIn: "1d"
  }

  const token = jwt.sign(payload, "Temporary Secret For Testing", options);

  return token;
}

module.exports = makeTokenFromUser;
