const db = require("../database/dbConfig.js");

const predict = startupPred => {
  return db("startups")
    .insert(startUpPred)
    .then(ids => ({ id: ids[0] }));
};

module.exports = { predict };
