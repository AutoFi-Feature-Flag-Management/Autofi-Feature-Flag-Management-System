// /:id/f
const express = require("express");
const clientController = require("../clientContoller/clientController");
const router = express.Router();

router.post("/:id/:status", clientController.changeFlag);

module.exports = router;
