/**
 * @module clientController
 * @description - Contains the implementations of the client-side requests.
 */

/**
 * @function getFeatureFlags
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @description - Retrieves feature flags from the business layer and sends them as a response.
 * @returns {object} - HTTP response object
 */
const getFeatureFlags = async (req, res) => {
  res.send(await business.getFeatureFlags());
};

/**
 * @function changeFlag
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @description - Calls the changeFlag function of the business layer and sends the request parameters as a response.
 * @returns {object} - HTTP response object
 */
const changeFlag = (req, res, next) => {
  business.changeFlag(req.params);
  res.send(req.params);
};

module.exports = {
  getFeatureFlags,
  changeFlag,
};
