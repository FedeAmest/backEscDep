const express = require('express');
const router = express.Router();

const {
  createJugadorPosicion,
  createManyJugadorPosiciones,
  deleteJugadorPosicion,
  deleteAllJugadorPosiciones
} = require('../Controllers/jugadoresPosicionesController');

/**
 * Crear una posición
 */
router.post('/', createJugadorPosicion);

/**
 * Crear muchas posiciones
 */
router.post('/bulk', createManyJugadorPosiciones);

/**
 * Borrar una posición
 */
router.delete('/:jugador_id/:posicion_id', deleteJugadorPosicion);

/**
 * Borrar todas las posiciones de un jugador
 */
router.delete('/jugador/:jugador_id', deleteAllJugadorPosiciones);

module.exports = router;
