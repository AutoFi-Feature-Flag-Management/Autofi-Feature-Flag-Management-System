/**
 * This module exports functions to marshal feature flag data from LaunchDarkly.
 *
 * @module featureFlagMarshal
 */

const FeatureFlag = require("../../../shared/model/featureFlag");

/**
 * Marshals an array of feature flag data from a LaunchDarkly JSON file.
 *
 * @param {string} json_file - The LaunchDarkly JSON file.
 * @returns {Array} An array of marshalled feature flags.
 */
const featureFlagsMarshaller = (json_file) => {
  //parsifying the launch darkly json_file into an object
  const launch_darkly_json = JSON.parse(json_file);

  //creating feature flag array
  let feature_flags = [];

  launch_darkly_json.items.forEach((item) => {
    feature_flags.push(
      new FeatureFlag(
        item.key,
        item.name,
        item.environments.production.on,
        new Date(item.environments.production.lastModified),
        item.description
      )
    );
  });

  return feature_flags;
};

/**
 * Marshals a single feature flag data from a LaunchDarkly JSON file.
 *
 * @param {string} json_file - The LaunchDarkly JSON file.
 * @returns {Object} A feature flag object from the marshalled feature flag.
 */
const featureFlagMarshaller = (json_file) => {
  //parsifying the launch darkly json_file into an object
  const launch_darkly_json = JSON.parse(json_file);

  const feature_flag = new FeatureFlag(
    launch_darkly_json.key,
    launch_darkly_json.name,
    launch_darkly_json.environments.production.on,
    new Date(launch_darkly_json.environments.production.lastModified),
    launch_darkly_json.description
  );

  return feature_flag;
};

module.exports = {
  featureFlagMarshaller,
  featureFlagsMarshaller,
};
