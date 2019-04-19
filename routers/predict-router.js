const router = require("express").Router();

const verifyAuth = require("../middleware/verify-auth.js");
const getStartupPrediction = require("../helpers/getStartupPrediction.js");
const validatePredictInputOptions = require("../helpers/validatePredictInputOptions.js");

router.post("/predict", async (req, res) => {
  const {
    headquarters,
    numFounders,
    numFundingRounds,
    numArticles,
    numEmployees,
    industry
  } = req.body;

  const startUp = {
    headquarters,
    numFounders,
    numFundingRounds,
    numArticles,
    numEmployees,
    industry
  };

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

  const invalidInputOption = !validatePredictInputOptions(headquarters, industry);

  try {
    if (missingRequiredInputs) {
      res.status(400).json({
        message: "Must provide start-up information"
      });
    } else if (incorrectDataType) {
      res.status(400).json({
          message: "Please provide the correct data types"
        });
    } else if (invalidInputOption) {
      res.status(400).json({
        message: "Please provide one of the valid options given"
      });
    } else {
      const prediction = await getStartupPrediction(startUp);

      if (prediction) {
        res.status(200).json({
          ...prediction,
          inputCompany: startUp
        });
      } else {
        throw "";
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error predicting value of this startup"
    });
  }
});

module.exports = router;
