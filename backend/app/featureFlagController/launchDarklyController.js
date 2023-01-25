const fetch = require("node-fetch");

async function getFeatureFlags() {
  const projectKey = "default";

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
  console.log(data);
  //need to handle server errors (server.status == 400) (400 etc.)
  console.log(resp.status);
  return data;
}

const changeFlag = (parameters) => {
  //http.patch("launchdarklypath")
  console.log(parameters.id);
  console.log(parameters.status);
};

module.exports = {
  getFeatureFlags,
  changeFlag,
};
