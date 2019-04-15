const db = require("../database/dbConfig.js");

const userExists = async (email) => {
  let output;
  let formattedEmail = email.toLowerCase();

  await db("users").where({ email: formattedEmail })
    .then(userObj => {
      if (userObj.length) {
        output = true;
      }
      else {
        output = false;
      }
    })
    .catch((err) => {
      throw "Failed To Search Users"
    });

    return output;
};

module.exports = userExists;
