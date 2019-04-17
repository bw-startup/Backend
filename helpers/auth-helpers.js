const bcrypt = require("bcrypt");

const userExists = require("./userExists.js");
const makeTokenFromUser = require("./makeTokenFromUser.js");
const db = require("../database/dbConfig.js");

const register = user => {
  let { password, email } = user;

  return new Promise(async (resolve, reject) => {
    const userDoesExist = await userExists(email);

    if (!userDoesExist) {
      const hash = bcrypt.hashSync(password, 10);

      password = hash;

      db("users")
        .insert({ ...user, password })
        .then(success => {
          resolve({ ...user, password });
        })
        .catch(err => {
          reject(500);
        });
    } else {
      reject(406);
    }
  });
};

const login = user => {
  let { password, email } = user;

  return new Promise(async (resolve, reject) => {
    const userDoesExist = await userExists(email);

    if (userDoesExist) {
      db("users")
        .where({ email })
        .first()
        .then(userObj => {
          const passwordIsCorrect = bcrypt.compareSync(
            password,
            userObj.password
          );
          if (userObj && passwordIsCorrect) {
            const token = makeTokenFromUser(userObj);
            resolve(token);
          } else {
            reject(406);
          }
        })
        .catch(err => {
          reject(500);
        });
    } else {
      reject(406);
    }
  });
};

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
module.exports = {
  register,
  login,
  find,
  findById,
  updateUser
};
