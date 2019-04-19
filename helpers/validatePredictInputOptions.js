const { companyIndustries, headquarterLocations } = require("./headquarter-industry-options-data.js");

const validatePredictInputOptions = (headquarters, industry) => {
  return (
    headquarterLocations.includes(headquarters) &&
    companyIndustries.includes(industry)
  );
};

module.exports = validatePredictInputOptions;
