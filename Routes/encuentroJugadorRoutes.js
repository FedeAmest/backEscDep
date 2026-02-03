
const express = require('express');
const router = express.Router();

const { getAllEncuentrosByJugadorId,getAllJugadoresByEncuentroId,createEncuentroJugador,deleteEncuentroJugador,updateEncuentroJugador} =require('../Controllers/encuentroJugadorController');

router.get('/:encuentro_id', getAllJugadoresByEncuentroId);
router.get('/jugador/:jugador_id', getAllEncuentrosByJugadorId);
router.post('/', createEncuentroJugador);
router.put('/:encuentro_jugador_id', updateEncuentroJugador);
router.delete('/:encuentro_jugador_id', deleteEncuentroJugador);

module.exports = router;