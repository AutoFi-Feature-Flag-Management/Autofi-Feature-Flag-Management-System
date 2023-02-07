/**
 *  Router for changing a feature flag's status.
 */

const express = require("express");
const clientController = require("../clientContoller/clientController");
const router = express.Router();

/**
 * @route POST /:key/:value
 * @desc Updates the value of a feature flag with a given key.
 * @access
 */
router.post("/:key/:value", clientController.changeFlag);

module.exports = router;
