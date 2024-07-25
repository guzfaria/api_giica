const { body, query, validationResult } = require('express-validator');

const validateRequestBody = [
  body('loteInfo').isArray().withMessage('loteInfo should be an array'),
  body('loteInfo.*.setor').isString().withMessage('setor should be a string'),
  body('loteInfo.*.quadra').isString().withMessage('quadra should be a string'),
  body('loteInfo.*.lotes').isArray().withMessage('lotes should be an array of strings'),
  body('loteInfo.*.codlogs').isArray().withMessage('codlogs should be an array of strings'),
  body('loteInfo.*.lotes.*').isString().withMessage('Each lote should be a string'),
  body('loteInfo.*.codlogs.*').isString().withMessage('Each codlog should be a string'),
  
  body('zonaInfos').isArray().withMessage('zonaInfos should be an array'),
  body('zonaInfos.*.zona').isString().withMessage('zona should be a string'),
  body('zonaInfos.*.ca').isInt().withMessage('ca should be an integer'),
  body('zonaInfos.*.to').isFloat().withMessage('to should be a float'),
  body('zonaInfos.*.taxa_de_permeabilidade').isFloat().withMessage('taxa_de_permeabilidade should be a float'),
  body('zonaInfos.*.fachada_ativa').isFloat().withMessage('fachada_ativa should be a float'),
  body('zonaInfos.*.beneficio').isFloat().withMessage('beneficio should be a float'),
  body('zonaInfos.*.gabarito').custom(value => {
    if (typeof value === 'string' && value.toLowerCase() === 'livre') {
      return true;
    }
    if (Number.isInteger(value)) {
      return true;
    }
    throw new Error('gabarito should be an integer or "LIVRE"');
  }),
  body('zonaInfos.*.cota_parte').isFloat().withMessage('cota_parte should be a float'),
  
  body('cota_solidariedade').isBoolean().withMessage('cota_solidariedade should be a boolean'),
  body('uso').isString().withMessage('use should be a string'),
  
  body('produtos').isArray().withMessage('produtos should be an array'),
  body('produtos.*.unidade_1').isFloat().withMessage('unidade_1 should be a float'),
  body('produtos.*.unidade_1Porcent').isInt().withMessage('unidade_1Percent should be an integer'),
  body('produtos.*.unidade_2').isFloat().withMessage('unidade_2 should be a float'),
  body('produtos.*.unidade_2Porcent').isInt().withMessage('unidade_2Percent should be an integer'),
  
  body('vagas').isInt().withMessage('vagas should be an integer'),
  body('NR').isFloat().withMessage('NR should be a float or zero if not applicable').optional({ nullable: true }),

  (req, res, next) => {
   // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
const validateLotInfo = [
    query('setor')
        .isNumeric()
        .withMessage('Setor must be a number')
        .isLength({ min: 3, max: 3 })
        .withMessage('Setor must be exactly 3 digits long'),
    query('quadra')
        .isNumeric()
        .withMessage('Quadra must be a number')
        .isLength({ min: 3, max: 3 })
        .withMessage('Setor must be exactly 3 digits long'),
    query('zona')
        .isString()
        .withMessage('Zona must be a string'),
    query('lotes')
        .isArray()
        .withMessage('Lotes must be an array')
        .custom((value) => {
          return value.every(item => /^\d{4}$/.test(item));
      })
      .withMessage('Each lot in the array must be a 4-digit number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateRequestBody, validateLotInfo };
