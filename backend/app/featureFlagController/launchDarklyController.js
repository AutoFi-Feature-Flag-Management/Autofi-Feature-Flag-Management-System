const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
ld_key = process.env.LD_API_KEY;

/**
 * @async
 * Makes a GET request to LaunchDarkly API and returns the feature flags.
 * @function
 * @param {string} parameters - The query parameters.
 * @param {int} [parameters.limit] - The limit of feature flags to return
 * @param {int} [parameters.offset] - The offset of feature flags list to return
 * @returns {string} The data returned by the API.
 */
async function getFeatureFlags(parameters) {
  const projectKey = "default";
  let limit = -1;
  let offset = 0;
  if (parameters.limit) {
    limit = parameters.limit;
  }
  if (parameters.offset) {
    offset = parameters.offset;
  }
  let resp;
  if (limit == -1) {
    resp = await axios.get(
      `https://app.launchdarkly.com/api/v2/flags/${projectKey}?offset=${offset}`,
      {
        headers: {
          Authorization: ld_key,
        },
      }
    );
  } else {
    resp = await axios.get(
      `https://app.launchdarkly.com/api/v2/flags/${projectKey}?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: ld_key,
        },
      }
    );
  }
  console.log("GET FLAGS REQUEST STATUS: " + resp.status);
  const data = await resp.data;
  return data;
}

/**
 * @async
 * Makes a GET request to LaunchDarkly API and returns the value of the requested feature flag.
 * @function
 * @param {string} [projectKey='default'] - The project key of the feature flag.
 * @param {Object} parameters - The parameters for the feature flag request.
 * @param {string} parameters.key - The key of the feature flag.
 *
 * @returns {string} The data returned by the API.
 */
async function getFeatureFlag(parameters) {
  const projectKey = "default";
  const featureFlagKey = parameters.key;

  resp = await axios.get(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${featureFlagKey}`,
    {
      headers: {
        Authorization: ld_key,
      },
    }
  );
  console.log("GET SINGLE FLAG REQUEST STATUS: " + resp.status);
  const data = await resp.data;
  return data;
}

/**
 * @async
 * Updates a feature flag by making a PATCH request to LaunchDarkly API.
 * @function
 * @param {Object} parameters - The parameters for updating the feature flag.
 * @param {string} parameters.key - The key of the feature flag.
 * @param {boolean} parameters.value - The new value of the feature flag.
 */
async function changeFlag(parameters) {
  const projectKey = "default";
  const featureFlagKey = parameters.key;
  const featureFlagValue = parameters.value;

  const resp = await axios.patch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${featureFlagKey}`,
    {
      patch: [
        {
          op: "replace",
          path: "/environments/production/on",
          value: featureFlagValue,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: ld_key,
      },
    }
  );

  console.log("PATCH FLAG REQUEST STATUS: " + resp.status);
  const data = await resp.data;
  return data;
}

module.exports = {
  getFeatureFlags,
  getFeatureFlag,
  changeFlag,
};
