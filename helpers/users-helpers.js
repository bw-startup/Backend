const db = require("../database/dbConfig.js");

const find = () => {
  return db("users");
};

const findById = id => {
  return db("users")
    .where({ id: Number(id) })
    .first();
};

const updateUser = (id, user) => {
  return db("users")
    .where("id", Number(id))
    .update(user);
};

const deleteUser = id => {
  return db("users")
    .where("id", Number(id))
    .del();
};

module.exports = {
  find,
  findById,
  updateUser,
  deleteUser
};
