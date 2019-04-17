const router = require("express").Router();

const verifyAuth = require("../middleware/verify-auth.js");
const { predictStartup } = require("../helpers/predict-helpers.js");

// TODO [POST] /predict (posts form to company DB)
router.post("/predict",  async (req, res) => {
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
  }

  const missingRequiredInputs = !(
    headquarters &&
    numFounders &&
    numFundingRounds &&
    numArticles &&
    numEmployees &&
    industry
  );

  try {
    if (missingRequiredInputs) {
      res.status(400).json({ message: "Must provide start-up information" });
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
