/**
 * Express Router for handling Feature Flag requests
 */

const express = require("express");
const clientController = require("../clientContoller/clientController");
const router = express.Router();

/**
 * @route GET /featureflags
 * @desc Get the feature flags for a given project. Takes query parameters of limit and offset.
 * @param {int} [limit] - The limit of feature flags to return
 * @param {int} [offset] - The offset of feature flags list to return
 * @access
 */
router.get("/featureflags", clientController.getFeatureFlags);

module.exports = router;
