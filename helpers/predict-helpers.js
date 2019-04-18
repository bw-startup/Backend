const superagent = require("superagent");;
const flaskModelAPI = "https://rocky-woodland-44877.herokuapp.com/api"

<<<<<<< HEAD
//TODO: connect to flask API
const predictStartup = startUp => {
  return db("startups")
    .insert(startUp)
    .then(ids => ({ id: ids[0] }));
};

module.exports = { predictStartup };
=======
const predictStartup = async ({
    headquarters,
    numFounders,
    numFundingRounds,
    numArticles,
    numEmployees,
    industry
}) => {
  let result;
  let error;
  await superagent
    .post(flaskModelAPI)
    .send({
      headquarters,
      numFounders,
      numFundingRounds,
      numArticles,
      numEmployees,
      industry
    })
    .then(res => {
      result = res.body;
    })
    .catch(err => {
      error =  err;
    });

    return result;
};


module.exports = {
  predictStartup
};
>>>>>>> 2faf2a65b5ee28d3ce87fa1af4f721e4e2b07dd8
