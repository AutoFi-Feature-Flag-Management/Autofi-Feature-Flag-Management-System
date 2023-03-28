/**
 * Express Router for handling a Feature Flag request
 */
const express = require("express");
const clientController = require("../clientController/clientController");
const router = express.Router();

/**
 * Get the feature flag for a given project
 *
 * @name GET /featureflag/:key
 * @function
 * @memberof module:featureFlagRouter
 * @param {string} key - The unique key of the feature flag to retrieve
 * @returns {object} Returns the feature flag object for the given key
 * @throws {Error} Throws an error if the feature flag cannot be retrieved
 */
router.get("/featureflag/:key", clientController.getFeatureFlag);

module.exports = router;
