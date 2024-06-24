
const express = require("express");
const router = express.Router();
const studyController = require("../../controllers/studyController");

/**
 * @openapi
 * /api/v1/landstudy/lotSize:
 *   get:
 *     tags:
 *       - Product Suggestions, product sizes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 units per floor:
 *                   type: object
 *                   example: {
 *                     "1": "300.00",
 *                     "2": "150.00",
 *                   }      
 */
router.get("/landstudy/:lotSize ", studyController.receiveProductSuggestions);

router.post("/landstudy/partial", studyController.calculatePartialLandStudy)

router.post("/landstudy/full", studyController.calculateFullLandStudy);

module.exports = router;