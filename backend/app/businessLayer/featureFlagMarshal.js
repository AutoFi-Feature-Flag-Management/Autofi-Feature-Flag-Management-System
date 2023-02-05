/**
 * This module exports a single function to marshal feature flag data from LaunchDarkly.
 *
 * @module featureFlagMarshal
 */

const FeatureFlag = require("../../../shared/model/featureFlag");

/**
 * Marshals feature flag data from a LaunchDarkly JSON file.
 *
 * @param {string} json_file - The LaunchDarkly JSON file.
 * @returns {Array} An array of marshalled feature flags.
 */
const launchDarklyMarshaller = (json_file) => {
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

module.exports = {
  launchDarklyMarshaller,
};
