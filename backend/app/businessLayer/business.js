const launchDarklyController = require("../featureFlagController/launchDarklyController");
const featureFlagMarshal = require("./featureFlagMarshal");

const getFeatureFlags = async () => {
  const data = await launchDarklyController.getFeatureFlags();
  const feature_flags = featureFlagMarshal.launchDarklyMarshaller(data);
  return feature_flags;
};

const changeFlag = (parameters) => {
  launchDarklyController.changeFlag(parameters);
};

module.exports = {
  getFeatureFlags,
  changeFlag,
};
