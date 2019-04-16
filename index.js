// Only require dotenv when not in production
!process.env.DB_ENV ? require("dotenv").config() : null;

const server = require("./server.js");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`);
});
