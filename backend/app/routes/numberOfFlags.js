/**
 * Express Router for handling the number of feature flags
 */
const express = require("express");
const clientController = require("../clientController/clientController");
const router = express.Router();

/**
 * @route GET /numberOfFlags
 * @desc Get the number of feature flags.
 * @access
 * @returns {string} - The number of feature flags.
 */
router.get("/numberofflags", clientController.getNumberOfFlags);

module.exports = router;
