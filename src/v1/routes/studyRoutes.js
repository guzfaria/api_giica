
const router = require("express").Router();
const studyController = require("../../controllers/studyController");
const { validateRequestBody, validateLotInfo } = require('../../middlewares/validationMiddleware');

router.get("/landstudy", validateLotInfo, studyController.receiveProductSuggestions);

router.post("/landstudy/partial", validateRequestBody, studyController.calculatePartialLandStudy)

router.post("/landstudy/full", validateRequestBody, studyController.calculateFullLandStudy);
module.exports = router;