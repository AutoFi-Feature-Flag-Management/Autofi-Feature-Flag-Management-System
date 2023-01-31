/**
 * @async
 * Makes a GET request to LaunchDarkly API and returns the feature flags.
 * @function
 * @param {string} [projectKey='default'] - The project key of the feature flags.
 * @returns {string} The data returned by the API.
 */
async function getFeatureFlags(projectKey = "default") {
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}`,
    {
      method: "GET",
      headers: {
        Authorization: "api-5380598a-207a-454b-956c-f862ddebc08a",
      },
    }
  );

  const data = await resp.text();
  console.log(resp.status);
  return data;
}

/**
 * Updates a feature flag by making a PATCH request to LaunchDarkly API.
 * @function
 * @param {Object} parameters - The parameters for updating the feature flag.
 * @param {string} parameters.id - The id of the feature flag.
 * @param {boolean} parameters.status - The new status of the feature flag.
 */
const changeFlag = (parameters) => {
  console.log(parameters.id);
  console.log(parameters.status);
};

module.exports = {
  getFeatureFlags,
  changeFlag,
};
