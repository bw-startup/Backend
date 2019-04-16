const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
      if (error) {
        if (req.originalUrl === "/api/auth/verify") {
          res.status(200).json({
            currentUserIsVerified: false
          });
        }
        else {
          res.status(401).json({
            message: "Your authorization token is invalid."
          });
        }
      }
      else {
        req.tokenPayload = decodedToken;
        next();
      }
    });
  }
  else {
    if (req.originalUrl === "/api/auth/verify") {
      res.status(200).json({
        currentUserIsVerified: false
      });
    }
    else {
      res.status(401).json({
        message: "You need authorization to access this endpoint"
      });
    }
  }
};

module.exports = verifyAuth;
