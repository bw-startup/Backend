const express = require("express");

const server = express();

const usersRouter = require("./routers/users-router.js");
const authRouter = require("./routers/auth-router.js");

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api", usersRouter);

server.get("/", (req, res) => {
  res.send("testing the server");
});

module.exports = server;
