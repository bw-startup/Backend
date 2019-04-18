const superagent = require("superagent");
const flaskModelAPI = "https://rocky-woodland-44877.herokuapp.com/api";

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
      error = err;
    });

  return result;
};

module.exports = {
  predictStartup
};
