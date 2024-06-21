
const axios = require('axios');
const LARAVEL_API_BASE_URL = process.env.LARAVEL_API_BASE_URL;

const LandstudyService = {
    receiveProductSuggestions: async (data, token) => {
        try {
            const response = await axios.post(
                `${LARAVEL_API_BASE_URL}/product-suggestions`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    },
    calculatePartialLandStudy: async (data, token) => {
        try {
            const response = await axios.post(
                `${LARAVEL_API_BASE_URL}/landstudy/partial`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    },
    calculateFullLandStudy: async (data, token) => {
        try {
            const response = await axios.post(
                `${LARAVEL_API_BASE_URL}/landstudy`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    },
};

module.exports = LandstudyService;
