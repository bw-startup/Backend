const testDB = require("../database/dbConfig.js");

const resetTestingDB = () => {
  beforeEach(async () => {
    // deletes everything on the table
    return await testDB("users").truncate();
    // CAUTION: MAKE SURE YOU ARE NOT RUNNING THIS ON PRODUCTION OR DEV DATABASES
  });

  afterEach(async () => {
    // deletes everything on the table
    return await testDB("users").truncate();
    // CAUTION: MAKE SURE YOU ARE NOT RUNNING THIS ON PRODUCTION OR DEV DATABASES
  });
};

module.exports = resetTestingDB;
