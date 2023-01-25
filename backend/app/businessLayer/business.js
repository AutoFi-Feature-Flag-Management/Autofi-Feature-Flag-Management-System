const launchDarklyController = require("../featureFlagController/launchDarklyController");

const getFeatureFlags = async () => {
  const data = await launchDarklyController.getFeatureFlags();
  return data;
};

const changeFlag = (parameters) => {
  launchDarklyController.changeFlag(parameters);
};

module.exports = {
  getFeatureFlags,
  changeFlag,
};
