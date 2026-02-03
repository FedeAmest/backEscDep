
const express = require('express');
const router = express.Router();

const { getGastosByClubId,createGastos,deleteGastos,updateGastos,getGastosById }= require('../Controllers/gastosController');

router.get('/club/:club_id', getGastosByClubId);
router.get('/:gastos_id', getGastosById);
router.post('/', createGastos);
router.put('/:gastos_id', updateGastos);
router.delete('/:gastos_id', deleteGastos);
module.exports = router;