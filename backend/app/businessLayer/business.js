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
  const feature_flags = featureFlagMarshal.featureFlagsMarshaller(data);
  return feature_flags;
};

/**
 * Gets the feature flag from the LaunchDarkly controller and marshals the data.
 * @param {Object} parameters - The parameters of the requested feature flag.
 *
 * @returns {Array} A single value array with the marshalled feature flag.
 */
const getFeatureFlag = async (parameters) => {
  const data = await launchDarklyController.getFeatureFlag(parameters);
  console.log(data);
  const feature_flag = featureFlagMarshal.featureFlagMarshaller(data);
  return feature_flag;
};

/**
 * Changes a feature flag in the LaunchDarkly controller.
 *
 * @param {Object} parameters - The parameters for the feature flag change.
 */
const changeFlag = async (parameters) => {
  // if (parameters.value != false || parameters.value != true) {
  //   throw new Error("value must be a boolean");
  // }
  const data = await launchDarklyController.changeFlag(parameters);
  return data;
};

module.exports = {
  getFeatureFlags,
  getFeatureFlag,
  changeFlag,
};
