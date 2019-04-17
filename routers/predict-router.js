const router = require("express").Router();

const { predictStartup } = require("../helpers/predict-helpers.js");

// TODO [POST] /predict (posts form to company DB)
router.post("/predict", verifyAuth, async (req, res) => {
  const {
    headquarters,
    numFounder,
    numFunding,
    numArticles,
    numEmployees
  } = req.body;

  const requiredInputs =
    !headquarters &&
    !numFounder &&
    !numFunding &&
    !numArticles &&
    !numEmployees;

  try {
    if (requiredInputs) {
      res.status(400).json({ message: "Must provide start-up information" });
    } else {
      const prediction = predictStartup(startUp);
      res.status(200).json({ prediction });
    }
  } catch (error) {
    res.status(500).json({ message: "Error predicting value of this startup" });
  }
});
