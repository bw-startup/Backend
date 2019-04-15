const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("testing the server");
});

module.exports = server;
