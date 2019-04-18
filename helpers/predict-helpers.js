const db = require("../database/dbConfig.js");

//TODO: connect to flask API
const predictStartup = startUp => {
  return db("startups")
    .insert(startUp)
    .then(ids => ({ id: ids[0] }));
};

module.exports = { predictStartup };
