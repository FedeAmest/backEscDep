const express = require('express');
const router = express.Router();

const {
  getRelacionesByJugadorId,
  getRelacionesByTutorId,
  getRelacionByIds
} = require('../Controllers/jugadoresTutoresController');

// Consultas
router.get('/jugador/:id', getRelacionesByJugadorId);
router.get('/tutor/:id', getRelacionesByTutorId);
router.get('/:jugador_id/:tutor_id', getRelacionByIds);

module.exports = router;