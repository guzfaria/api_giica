const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const GIICA_BASE_URL = process.env.GIICA_BASE_URL;

const LandstudyService = {
    receiveProductSuggestions: async (data, token) => {
        try {
            const response = await axios.get(
                `${GIICA_BASE_URL}/product-suggestions`,
                {
                    params: {
                        sector: data.setor,
                        block: data.quadra,
                        lots: data.lotes,
                        zone: data.zona
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                }
            );
            return response.data;
        } catch (error) {
            const response = {
                status: error.response.status,
                error: error.response.data,
                timestamp: new Date().toLocaleString(),
            }
            throw new Error(JSON.stringify(response));
            
        }
    },
    calculatePartialLandStudy: async (data, token) => {
        try {
            const response = await axios.post(
                `${GIICA_BASE_URL}/partial`,
                {
                    body: data,
                    token: token,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            return response.data;
        } catch (error) {
            const response = {
                status: error.response.status,
                error: error.response.data,
                timestamp: new Date().toLocaleString(),
            }
            throw new Error(JSON.stringify(response));
        }
    },
    calculateFullLandStudy: async (data, token) => {
        const outorga = [];
        for (const value of featuresSelected.features) {
            outorga.push(value.properties.lo_setor + value.properties.lo_quadra + value.properties.codlog.replace('-', ''));
        }
        try {
            const response = await axios.post(
                `${GIICA_BASE_URL}/full`,
                {
                    body: data,
                    token: token,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            const response = {
                status: error.response.status,
                error: error.response.data,
                timestamp: new Date().toLocaleString(),
            }
            throw new Error(JSON.stringify(response));
        }
    },
};

module.exports = LandstudyService;
