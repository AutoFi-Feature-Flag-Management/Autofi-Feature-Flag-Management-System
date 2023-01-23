const express = require("express");
const clientController = require("../clientContoller/clientController");
const router = express.Router();

router.get("/featureflags", clientController.getFeatureFlags);

module.exports = router;
