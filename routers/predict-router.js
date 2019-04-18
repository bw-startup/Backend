const router = require("express").Router();

const verifyAuth = require("../middleware/verify-auth.js");
const { predictStartup } = require("../helpers/predict-helpers.js");

router.post("/predict",  async (req, res) => {
  const {
    headquarters,
    numFounders,
    numFundingRounds,
    numArticles,
    numEmployees,
    industry
  } = req.body;

<<<<<<< HEAD
  const missingRequiredInputs =
    !headquarters &&
    !numFounder &&
    !numFunding &&
    !numArticles &&
    !numEmployees;
=======
  const startUp = {
    headquarters,
    numFounders,
    numFundingRounds,
    numArticles,
    numEmployees,
    industry
  }

  const missingRequiredInputs = !(
    headquarters &&
    numFounders &&
    numFundingRounds &&
    numArticles &&
    numEmployees &&
    industry
  );

  const incorrectDataType = !(
    typeof headquarters === "string" &&
    typeof numFounders === "number" &&
    typeof numFundingRounds === "number" &&
    typeof numArticles === "number" &&
    typeof numEmployees === "number" &&
    typeof industry === "string"
  );
>>>>>>> 2faf2a65b5ee28d3ce87fa1af4f721e4e2b07dd8

  try {
    if (missingRequiredInputs) {
      res.status(400).json({ message: "Must provide start-up information" });
    } else if (incorrectDataType) {
      res.status(400).json({ message: "Please provide the correct data types" });
    } else {
      const prediction = await predictStartup(startUp);
      if (prediction) {
        res.status(200).json({ ...prediction });
      }
      else {
        throw "";
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error predicting value of this startup" });
  }
});

module.exports = router;
