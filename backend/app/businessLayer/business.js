/**
 * This module exports two functions related to feature flags.
 *
 * @module featureFlagService
 */

const launchDarklyController = require("../featureFlagController/launchDarklyController");
const launchDarklyFeatureFlagMarshal = require("./marshals/launchDarklyFeatureFlagMarshal");

/**
 * Gets the feature flags from the LaunchDarkly controller and marshals the data.
 * @param {Object} parameters - The query parameters of the requested feature flags.
 * @param {int} [parameters.limit] - The limit of feature flags to return
 * @param {int} [parameters.offset] - The offset of feature flags list to return
 * @returns {Array} An array of marshalled feature flags.
 */
const getFeatureFlags = async (parameters) => {
  const data = await launchDarklyController.getFeatureFlags(parameters);
  const feature_flags =
    launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller(data);
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
  const feature_flag =
    launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller(data);
  return feature_flag;
};

/**
 * Changes a feature flag in the LaunchDarkly controller.
 *
 * @param {Object} parameters - The parameters for the feature flag change.
 */
const changeFlag = async (parameters) => {
  if (typeof parameters.value === "boolean") {
    const data = await launchDarklyController.changeFlag(parameters);
    return data;
  } else {
    throw new Error("value must be a boolean");
  }
};

/**
 * Gets the number of feature flags from the LaunchDarkly controller, mashals the data then returns the length.
 * @returns {String} The number of feature flags.
 */
const getNumberOfFlags = async () => {
  const data = await launchDarklyController.getFeatureFlags({});
  const feature_flags =
    launchDarklyFeatureFlagMarshal.launchDarklyFlagMarshaller(data);
  //Express required sent data to be in string format
  return feature_flags.length.toString();
};

module.exports = {
  getFeatureFlags,
  getFeatureFlag,
  changeFlag,
  getNumberOfFlags,
};
