const business = require("../businessLayer/business");

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
  try {
    res.send(await business.getFeatureFlags(req.query));
  } catch (e) {
    console.log(e.message);
    res.status(400);
    res.send(e.message);
  }
};

/**
 * @function getFeatureFlag
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @description - Retrieves feature flag from the business layer and sends it as a response.
 * @returns {object} - HTTP response object
 */
const getFeatureFlag = async (req, res) => {
  try {
    res.send(await business.getFeatureFlag(req.params));
  } catch (e) {
    console.log(e.message);
    res.status(400);
    res.send(e.message);
  }
};

/**
 * @function changeFlag
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @description - Calls the changeFlag function of the business layer and sends the request body as a response.
 * @returns {object} - HTTP response object
 */
const changeFlag = async (req, res) => {
  try {
    res.send(await business.changeFlag(req.body));
  } catch (e) {
    console.log(e.message);
    res.status(400);
    res.send(e.message);
  }
};

/**
 * @function getNumberOfFlags
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @description - Calls the getNumberOfFlags function of the business layer and sends the response.
 */
const getNumberOfFlags = async (req, res) => {
  try {
    res.send(await business.getNumberOfFlags());
  } catch (e) {
    console.log(e.message);
    res.status(400);
    res.send(e.message);
  }
};

module.exports = {
  getFeatureFlags,
  getFeatureFlag,
  changeFlag,
  getNumberOfFlags,
};
