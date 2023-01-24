const launchDarklyController = require("../featureFlagController/launchDarklyController");

const getFeatureFlags = () => {
  return launchDarklyController.getFeatureFlags();
};

const changeFlag = (parameters) => {
  launchDarklyController.changeFlag(parameters);
};

module.exports = {
  getFeatureFlags,
  changeFlag,
};
