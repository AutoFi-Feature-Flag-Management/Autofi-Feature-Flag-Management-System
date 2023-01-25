const business = require("../businessLayer/business");

const getFeatureFlags = async (req, res) => {
  res.send(await business.getFeatureFlags());
};

const changeFlag = (req, res, next) => {
  // res.send(req.params);
  business.changeFlag(req.params);
  res.send(req.params);
};

module.exports = {
  getFeatureFlags,
  changeFlag,
};
