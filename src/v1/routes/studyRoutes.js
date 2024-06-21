
const express = require("express");
const router = express.Router();
const studyController = require("../../controllers/studyController");

router.get("/:lotSize ", studyController.receiveProductSuggestions);

router.post("/partial", studyController.calculatePartialLandStudy)

router.post("/full", studyController.calculateFullLandStudy);

module.exports = router;