const fetch = require("node-fetch");

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
        Authorization: "api-b85a475e-50aa-4866-b376-a89bbefa98bb",
      },
    }
  );

  const data = await resp.text();
  console.log(resp.status);
  return data;
}

/**
 * @async
 * Updates a feature flag by making a PATCH request to LaunchDarkly API.
 * @function
 * @param {Object} parameters - The parameters for updating the feature flag.
 * @param {string} parameters.key - The key of the feature flag.
 * @param {string} parameters.value - The new value of the feature flag.
 */
async function changeFlag(parameters) {
  const projectKey = "default";
  const featureFlagKey = parameters.key;
  const featureFlagValue = parameters.value;

  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${featureFlagKey}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "api-b85a475e-50aa-4866-b376-a89bbefa98bb",
      },
      body: JSON.stringify({
        patch: [
          {
            op: "replace",
            path: "/environments/production/on",
            value: featureFlagValue,
          },
        ],
      }),
    }
  );

  const data = await resp.json();
  console.log(resp.status);
  return data;
}

module.exports = {
  getFeatureFlags,
  changeFlag,
};
