const FeatureFlag = require("../model/featureFlag");

const launchDarklyMarshaller = (json_file) => {
  //parsifying the launch darkly json_file into an object
  const launch_darkly_json = JSON.parse(json_file);

  //creating feature flag array
  let feature_flags = [];
  launch_darkly_json.items.forEach((item) => {
    feature_flags.push(
      new FeatureFlag(
        item.name,
        item.environments.production.on,
        new Date(item.environments.production.lastModified)
      )
    );
  });

  return feature_flags;
};

module.exports = {
  launchDarklyMarshaller,
};
