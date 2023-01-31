/**
 *  Router for changing a feature flag's status.
 */

const express = require("express");
const clientController = require("../clientContoller/clientController");
const router = express.Router();

/**
 * @route POST /:id/:status
 * @desc Updates the status of a feature flag with a given id.
 * @access
 */
router.post("/:id/:status", clientController.changeFlag);

module.exports = router;
