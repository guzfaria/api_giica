const LandstudyService = require('../services/studyService');

const LandstudyController = {
    receiveProductSuggestions: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; 
            const result = await LandstudyService.receiveProductSuggestions(req.body, token);
            res.status(200).json({ suggestions: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    calculatePartialLandStudy: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; 
            const result = await LandstudyService.calculatePartialLandStudy(req.body, token);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    calculateFullLandStudy: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; 
            const result = await LandstudyService.calculateFullLandStudy(req.body, token);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = LandstudyController;
