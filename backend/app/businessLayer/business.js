/**
 * This module exports two functions related to feature flags.
 *
 * @module featureFlagService
 */

const launchDarklyController = require("../featureFlagController/launchDarklyController");
const featureFlagMarshal = require("./featureFlagMarshal");

/**
 * Gets the feature flags from the LaunchDarkly controller and marshals the data.
 *
 * @returns {Array} An array of marshalled feature flags.
 */
const getFeatureFlags = async () => {
  const data = await launchDarklyController.getFeatureFlags();
  const feature_flags = featureFlagMarshal.launchDarklyMarshaller(data);
  return feature_flags;
};

/**
 * Changes a feature flag in the LaunchDarkly controller.
 *
 * @param {Object} parameters - The parameters for the feature flag change.
 */
const changeFlag = (parameters) => {
  launchDarklyController.changeFlag(parameters);
};

module.exports = {
  getFeatureFlags,
  changeFlag,
};
