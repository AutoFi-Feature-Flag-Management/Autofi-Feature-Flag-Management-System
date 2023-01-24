const http = require("http");

const ff = [
  {
    id: 1,
    status: false,
  },
  {
    id: 2,
    status: false,
  },
  {
    id: 3,
    status: true,
  },
  {
    id: 4,
    status: false,
  },
  {
    id: 5,
    status: true,
  },
];

const getFeatureFlags = () => {
  return ff;
};

const changeFlag = (parameters) => {
  //http.patch("launchdarklypath")
  console.log(parameters.id);
  console.log(parameters.status);
};

module.exports = {
  getFeatureFlags,
  changeFlag,
};
