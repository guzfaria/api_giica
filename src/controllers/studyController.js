const LandstudyService = require('../services/studyService');

const LandstudyController = {
    receiveProductSuggestions: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const data = req.query;
            const result = await LandstudyService.receiveProductSuggestions(data, token);

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(`${error}`);
        }
    },
    calculatePartialLandStudy: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; 

            const result = await LandstudyService.calculatePartialLandStudy(req.body, token);
            
            const partialResult = {
                matricula: Number(result.lotArea),
                area_doacao: Number(result.donationArea).toFixed(4),
                area_remanescente: Number(result.remainingArea).toFixed(4),
                area_privativa: Number(result[0].private).toFixed(4),
                area_construida: Number(result[0].constructed).toFixed(4),
                privativa_construida: Number(result[0].privateConstructed).toFixed(4),
                privativa_terreno: Number(result[0].privateLand).toFixed(4),
            };

            res.status(200).json(partialResult);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    calculateFullLandStudy: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; 
            const result = await LandstudyService.calculateFullLandStudy(req.body, token);
            const fullResult = {
                dados_iniciais: {
                    matricula: Number(result.lotArea),
                    area_doacao: Number(result.donationArea).toFixed(4),
                    area_remanescente: Number(result.remainingArea).toFixed(4),
                    area_privativa: Number(result[0].private).toFixed(4),
                    area_construida: Number(result[0].constructed).toFixed(4),
                    privativa_construida: Number(result[0].privateConstructed).toFixed(4),
                    privativa_terreno: Number(result[0].privateLand).toFixed(4),

                },
                descricao_unidades: {
                    quantidade_de_unidades: [{
                        loja: 1,
                        nr: Number(result[0].NrQuantity).toFixed(4),
                        apto_1: Number(result[0].Apt1Quantity).toFixed(4),
                        apto_2: Number(result[0].Apt2Quantity).toFixed(4),
                        total: Number(result[0].totalQuantity).toFixed(4)
                    }],
                    area_unidades: [{
                        loja: Number(result[0].storeAreaUnit).toFixed(4),
                        nr: Number(result[0].NrAreaUnit).toFixed(4),
                        apto_1: Number(result[0].Apt1AreaUnit).toFixed(4),
                        apto_2: Number(result[0].Apt2AreaUnit).toFixed(4),
                        total: Number(result[0].totalAreaUnit).toFixed(4)
                    }],
                    area_de_uso: [{
                        loja: Number(result[0].storeAreaUsage).toFixed(4),
                        nr: Number(result[0].NrAreaUsage).toFixed(4),
                        apto_1: Number(result[0].Apt1AreaUsage).toFixed(4),
                        apto_2: Number(result[0].Apt2AreaUsage).toFixed(4),
                        total: result[0].totalAreaUsage
                    }],
                },
                descricao_pavimentos: {
                    pavimento: [result[0].pavements_1, { 
                        tipo: ["Estacionamento"],
                        area: [Number(result[0].areaGarage).toFixed(4)],
                    }],
                    pavimento: ["Térreo", {
                        tipo: ["Lobby", "Loja"],
                        area: [Number(result[0].areaGroundFloorLobby).toFixed(4), Number(result[0].areaGroundFloorStore).toFixed(4)],
                    }],
                    pavimento: ["Mezanino", {
                        tipo: ["Lazer"],
                        area: [Number(result[0].areaMezzanineLounge).toFixed(4)],
                    }],
                    pavimento: [result[0].pavements_2, {
                        tipo: [result[0].UnitNr + " unidades NR"],
                        area: [Number(result[0].areaNrUnit).toFixed(2)]
                    }],
                    pavimento: [result[0].pavements_3, {
                        tipo: [{
                            unidades_apto_1: result[0].apto1,
                            unindades_apto_2: result[0].apto2,
                        }],
                        area: [{
                            apto_1: Number(result[0].pavementsApto1).toFixed(2),
                            apto_2: Number(result[0].pavementsApto2).toFixed(2)
                        }],
                    }],
                    pavimento: ["Ático", {
                        tipo: ["Ático"],
                        area: [Number(result[0].atticPavementArea).toFixed(2)]
                    }]
                },
                descricao_areas: {
                    computavel: {
                        estacionamento: result[0].garageComputable,
                        tecnica: result[0].technicalComputable, 
                        loja: result[0].activeFacadeStoreComputable, 
                        nr: result[0].NrComputable,
                        terreno: result[0].landComputable,
                        aptos: Number(result[0].aptoComputable).toFixed(2),
                        comum: Number(result[0].commonComputable).toFixed(2),
                        total: Number(result[0].totalComputable).toFixed(2)
                    },
                    nao_computavel: {
                        estacionamento: Number(result[0].garageNonComputable).toFixed(2),
                        tecnica: Number(result[0].technicalNonComputable).toFixed(2), 
                        loja: Number(result[0].activeFacadeStoreNonComputable).toFixed(2), 
                        nr: Number(result[0].NrNonComputable).toFixed(2),
                        terreno: Number(result[0].landNonComputable).toFixed(2),
                        aptos: Number(result[0].aptoNonComputable).toFixed(2),
                        comum: Number(result[0].commonNonComputable).toFixed(2),
                        total: Number(result[0].totalNonComputable).toFixed(2)
                    },
                    total: {
                        estacionamento: Number(result[0].garageTotal).toFixed(2),
                        tecnica: Number(result[0].technicalTotal).toFixed(2), 
                        loja: Number(result[0].activeFacadeStoreTotal).toFixed(2), 
                        nr: Number(result[0].NrTotal).toFixed(2),
                        terreno: Number(result[0].landTotal).toFixed(2),
                        aptos: Number(result[0].aptoTotal).toFixed(2),
                        comum: Number(result[0].commonTotal).toFixed(2),
                        total: Number(result[0].computableAndNonComputableTotal).toFixed(2)
                    },
                },
                descricao_vagas: {
                    vagas_cobertas: result[0].coveredParkingSpots,
                    vagas_descobertas: result[0].uncoveredParkingSpots,
                    indice: result[0].parkingSpotsIndex,
                    num_de_pavimentos: result[0].numberOfGaragePavements,
                    auto: {
                        aptos: result[0].aptoAuto,
                        loja: result[0].storeAuto,
                        total: result[0].totalAuto
                    },
                    pne: {
                        aptos: result[0].aptoPNE,
                        loja: result[0].storePNE,
                        total: result[0].totalPNE
                    },
                    cd: {
                        aptos: result[0].aptoCD,
                        loja: result[0].storeCD,
                        total: result[0].totalCD
                    },
                    moto: {
                        aptos: result[0].aptoMoto,
                        loja: result[0].storeMoto,
                        total: result[0].totalMoto
                    },
                    bike: {
                        aptos: result[0].aptoBike,
                        loja: result[0].storeBike,
                        total: result[0].totalBike
                    },
                },
                saldos: {
                    ca: {
                        lei: Number(result[0].caLaw).toFixed(4),
                        projeto: Number(result[0].caProject).toFixed(4),
                        saldo: Number(result[0].caBalance).toFixed(4),
                    },
                    taxa_ocupacao: {
                        lei: Number(result[0].occupationRateLaw).toFixed(4),
                        projeto: Number(result[0].occupationRateProject).toFixed(4),
                        saldo: Number(result[0].occupationRateBalance).toFixed(4),
                    },
                    potencial: {
                        lei: Number(result[0].potentialLaw).toFixed(4),
                        projeto: Number(result[0].potentialProject).toFixed(4),
                        saldo: Number(result[0].potentialBalance).toFixed(4),
                    },
                    ocupacao: {
                        lei: Number(result[0].occupationLaw).toFixed(4),
                        projeto: Number(result[0].occupationProject).toFixed(4),
                        saldo: Number(result[0].occupationBalance).toFixed(4),
                    },
                    fachada_ativa: {
                        lei: Number(result[0].activeFacadeLaw).toFixed(4),
                        projeto: Number(result[0].activeFacadeProject).toFixed(4),
                        saldo: Number(result[0].activeFacadeBalance).toFixed(4),
                    },
                    beneficio: {
                        lei: Number(result[0].benefitLaw).toFixed(4),
                        projeto: Number(result[0].benefitProject).toFixed(4),
                        saldo: Number(result[0].benefitBalance).toFixed(4),
                    },
                    nao_computavel: {
                        lei: Number(result[0].nonComputableLaw).toFixed(4),
                        projeto: Number(result[0].nonComputableProject).toFixed(4),
                        saldo: Number(result[0].nonComputableBalance).toFixed(4),
                    },
                    nc: {
                        lei: Number(result[0].ncLaw).toFixed(4),
                        projeto: Number(result[0].ncProject).toFixed(4),
                        saldo: Number(result[0].ncBalance).toFixed(4),
                    },
                    permeavel: {
                        lei: Number(result[0].permeableLaw).toFixed(4),
                        projeto: Number(result[0].permeableProject).toFixed(4),
                        saldo: Number(result[0].permeableBalance).toFixed(4),
                    },
                    terraco_maximo: {
                        lei: Number(result[0].maxTerraceLaw).toFixed(4),
                        projeto: Number(result[0].maxTerraceProject).toFixed(4),
                        saldo: Number(result[0].maxTerraceBalance).toFixed(4),
                    },
                    minimo_unidades: {
                        lei: Number(result[0].minUnitsLaw).toFixed(4),
                        projeto: Number(result[0].minUnitsProject).toFixed(4),
                        saldo: Number(result[0].minUnitsBalance).toFixed(4),
                    },
                    cota_parte: {
                        lei: Number(result[0].plotRatioLaw).toFixed(4),
                        projeto: Number(result[0].plotRatioProject).toFixed(4),
                        saldo: Number(result[0].plotRatioBalance).toFixed(4),
                    },
                    gabarito: {
                        lei: Number(result[0].templateLaw).toFixed(4),
                        projeto: Number(result[0].templateProject).toFixed(4),
                        saldo: result[0].templateBalance
                    },
                },
                outorga: {
                    c: {
                        ate_50: Number(result[0].cUpTo50).toFixed(2),
                        acima_50: Number(result[0].cAbove50).toFixed(2),
                        acima_70: Number(result[0].cAbove70).toFixed(2),
                    },
                    area: {
                        ate_50: Number(result[0].areaUpTo50).toFixed(2),
                        acima_50: Number(result[0].areaAbove50).toFixed(2),
                        acima_70: Number(result[0].areaAbove70).toFixed(2),
                        total: Number(result[0].totalAreaOutorga).toFixed(2),
                    },
                    outorga_valor: {
                        ate_50: Number(result[0].outorgaUpTp50).toFixed(2),
                        acima_50: Number(result[0].outorgaAbove50).toFixed(2),
                        acima_70: Number(result[0].outorgaAbove70).toFixed(2),
                        total: Number(result[0].totalOutorga).toFixed(2),
                    },
                    cota_solidariedade: {
                        area_terreno: Number(result.lotArea),
                        maior_valor_outorga: Number(result[0].highestValueOutorga).toFixed(2),
                        outorga_complementar: Number(result[0].complementaryOutorga).toFixed(2),
                        total: Number(result[0].outorgaPlusSolidarityQuota).toFixed(2),
                    }
                }
            };
            res.status(200).json(fullResult);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = LandstudyController;


